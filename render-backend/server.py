from flask import Flask, request, jsonify
import subprocess
import os
import requests
import tempfile
import threading

app = Flask(__name__)

GROQ_KEY = os.environ.get("GROQ_API_KEY")
PIXABAY_KEY = os.environ.get("PIXABAY_API_KEY")
YT_REFRESH_TOKEN = os.environ.get("YOUTUBE_REFRESH_TOKEN")
YT_CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
YT_CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")

jobs = {}

# ============================================
# HEALTH CHECK
# ============================================

@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "service": "SnapSpark Video Pipeline",
        "version": "1.0.0",
        "ffmpeg": check_ffmpeg(),
    })

def check_ffmpeg():
    try:
        result = subprocess.run(
            ["ffmpeg", "-version"],
            capture_output=True, text=True
        )
        return "available" if result.returncode == 0 else "not found"
    except:
        return "not found"

# ============================================
# GENERATE SCRIPT
# ============================================

@app.route("/generate-script", methods=["POST"])
def generate_script():
    data = request.json
    niche = data.get("niche", "BMW Cars")
    video_type = data.get("type", "short")
    language = data.get("language", "hindi")

    system_prompt = f"""You are a viral YouTube {'Shorts' if video_type == 'short' else 'video'} script writer.
Write ONLY in Hindi. Be energetic, viral, and engaging.
For shorts: 45-60 seconds max.
For long: 8-10 minutes."""

    user_prompt = f"Write a {'45-second Shorts' if video_type == 'short' else '8-minute'} script about: {niche}"

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama-3.3-70b-versatile",
            "temperature": 0.9,
            "max_tokens": 500 if video_type == "short" else 2000,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ]
        }
    )

    result = response.json()
    script = result["choices"][0]["message"]["content"]

    # Generate title too
    title_response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama-3.3-70b-versatile",
            "max_tokens": 100,
            "messages": [
                {"role": "system", "content": "Generate a viral Hindi YouTube title. Return ONLY the title."},
                {"role": "user", "content": script[:200]}
            ]
        }
    )

    title = title_response.json()["choices"][0]["message"]["content"]

    return jsonify({
        "success": True,
        "script": script,
        "title": title,
        "niche": niche,
        "type": video_type
    })

# ============================================
# GENERATE VOICE (Google TTS)
# ============================================

@app.route("/generate-voice", methods=["POST"])
def generate_voice():
    data = request.json
    text = data.get("text", "")[:500]

    try:
        url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={requests.utils.quote(text)}&tl=hi&client=tw-ob"
        response = requests.get(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://translate.google.com/"
        })

        if response.status_code == 200:
            import base64
            audio_b64 = base64.b64encode(response.content).decode()
            return jsonify({
                "success": True,
                "audioBase64": audio_b64,
                "provider": "Google TTS"
            })
        else:
            return jsonify({"success": False, "error": "Google TTS failed"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

# ============================================
# GET FOOTAGE (Pixabay)
# ============================================

@app.route("/get-footage", methods=["POST"])
def get_footage():
    data = request.json
    query = data.get("query", "BMW car")
    count = data.get("count", 5)

    response = requests.get(
        f"https://pixabay.com/api/videos/",
        params={
            "key": PIXABAY_KEY,
            "q": query,
            "per_page": count,
            "video_type": "film",
            "order": "popular"
        }
    )

    result = response.json()
    videos = []

    for hit in result.get("hits", []):
        videos.append({
            "id": hit["id"],
            "duration": hit["duration"],
            "tags": hit["tags"],
            "url": hit["videos"]["medium"]["url"] if hit["videos"].get("medium") else hit["videos"]["small"]["url"],
            "smallUrl": hit["videos"]["small"]["url"] if hit["videos"].get("small") else ""
        })

    return jsonify({
        "success": True,
        "videos": videos,
        "total": result.get("totalHits", 0)
    })

# ============================================
# FULL VIDEO PIPELINE
# ============================================

@app.route("/create-video", methods=["POST"])
def create_video():
    data = request.json
    job_id = data.get("jobId", f"job_{len(jobs)+1}")

    jobs[job_id] = {"status": "starting", "progress": 0}

    # Run in background thread
    thread = threading.Thread(
        target=run_video_pipeline,
        args=(job_id, data)
    )
    thread.start()

    return jsonify({
        "success": True,
        "jobId": job_id,
        "status": "started",
        "pollUrl": f"/job/{job_id}"
    })

def run_video_pipeline(job_id, data):
    niche = data.get("niche", "BMW Cars")
    video_type = data.get("type", "short")
    script = data.get("script", "")
    footage_urls = data.get("footageUrls", [])

    try:
        with tempfile.TemporaryDirectory() as tmpdir:

            # STEP 1: Download footage clips
            jobs[job_id] = {"status": "downloading footage", "progress": 20}
            clip_files = []

            for i, url in enumerate(footage_urls[:3]):
                try:
                    response = requests.get(url, timeout=30)
                    clip_path = os.path.join(tmpdir, f"clip_{i}.mp4")
                    with open(clip_path, "wb") as f:
                        f.write(response.content)
                    clip_files.append(clip_path)
                except:
                    pass

            if not clip_files:
                jobs[job_id] = {"status": "failed", "error": "No footage downloaded"}
                return

            # STEP 2: Generate voice
            jobs[job_id] = {"status": "generating voice", "progress": 40}
            voice_path = os.path.join(tmpdir, "voice.mp3")

            text = script[:300]
            voice_url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={requests.utils.quote(text)}&tl=hi&client=tw-ob"
            voice_response = requests.get(voice_url, headers={
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://translate.google.com/"
            })

            if voice_response.status_code == 200:
                with open(voice_path, "wb") as f:
                    f.write(voice_response.content)

            # STEP 3: Combine clips with ffmpeg
            jobs[job_id] = {"status": "editing video", "progress": 60}

            # Create file list for ffmpeg
            list_path = os.path.join(tmpdir, "clips.txt")
            with open(list_path, "w") as f:
                for clip in clip_files:
                    f.write(f"file '{clip}'\n")

            combined_path = os.path.join(tmpdir, "combined.mp4")

            # Concat clips
            subprocess.run([
                "ffmpeg", "-f", "concat", "-safe", "0",
                "-i", list_path,
                "-c", "copy",
                combined_path, "-y"
            ], capture_output=True)

            # STEP 4: Add voice overlay
            jobs[job_id] = {"status": "adding voice", "progress": 75}
            output_path = os.path.join(tmpdir, "final.mp4")

            if os.path.exists(voice_path):
                subprocess.run([
                    "ffmpeg",
                    "-i", combined_path,
                    "-i", voice_path,
                    "-c:v", "copy",
                    "-c:a", "aac",
                    "-shortest",
                    output_path, "-y"
                ], capture_output=True)
            else:
                output_path = combined_path

            # STEP 5: Upload to YouTube if credentials available
            jobs[job_id] = {"status": "uploading", "progress": 90}
            youtube_url = None

            if YT_REFRESH_TOKEN and YT_CLIENT_ID and YT_CLIENT_SECRET and os.path.exists(output_path):
                youtube_url = upload_to_youtube(output_path, data.get("title", niche), script[:500])

            jobs[job_id] = {
                "status": "completed",
                "progress": 100,
                "youtubeUrl": youtube_url,
                "message": "Video pipeline complete!"
            }

    except Exception as e:
        jobs[job_id] = {
            "status": "failed",
            "error": str(e),
            "progress": 0
        }

# ============================================
# YOUTUBE UPLOAD
# ============================================

def upload_to_youtube(video_path, title, description):
    try:
        # Get access token
        token_response = requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": YT_CLIENT_ID,
                "client_secret": YT_CLIENT_SECRET,
                "refresh_token": YT_REFRESH_TOKEN,
                "grant_type": "refresh_token"
            }
        )
        access_token = token_response.json().get("access_token")
        if not access_token:
            return None

        # Upload video
        with open(video_path, "rb") as f:
            upload_response = requests.post(
                "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&uploadType=media",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Content-Type": "video/mp4"
                },
                data=f.read(),
                params={
                    "part": "snippet,status"
                }
            )

        result = upload_response.json()
        video_id = result.get("id")
        return f"https://youtube.com/watch?v={video_id}" if video_id else None

    except Exception as e:
        return None

# ============================================
# JOB STATUS
# ============================================

@app.route("/job/<job_id>", methods=["GET"])
def get_job(job_id):
    job = jobs.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify({"jobId": job_id, **job})

@app.route("/jobs", methods=["GET"])
def get_all_jobs():
    return jsonify({"jobs": jobs})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
