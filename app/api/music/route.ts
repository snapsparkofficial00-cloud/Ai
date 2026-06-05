import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mood = searchParams.get("mood") || "phonk";

    // Free copyright-free music by mood
    const tracks: Record<string, any> = {
      phonk: {
        name: "Dark Phonk Drive",
        mood: "phonk",
        url: "https://cdn.pixabay.com/audio/2023/10/30/audio_0b0d9e57ac.mp3",
        vibe: "🔥 Dark viral phonk",
      },
      epic: {
        name: "Epic Cinematic Rise",
        mood: "epic",
        url: "https://cdn.pixabay.com/audio/2023/09/14/audio_9b7a3b84c8.mp3",
        vibe: "⚡ Cinematic epic",
      },
      motivational: {
        name: "Hype Energy",
        mood: "motivational",
        url: "https://cdn.pixabay.com/audio/2022/10/30/audio_0b0d9e57ac.mp3",
        vibe: "💪 High energy hype",
      },
      dramatic: {
        name: "Dramatic Tension",
        mood: "dramatic",
        url: "https://cdn.pixabay.com/audio/2023/06/08/audio_f6d68ca449.mp3",
        vibe: "🎭 Dramatic intense",
      },
      chill: {
        name: "Smooth Chill",
        mood: "chill",
        url: "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3",
        vibe: "😎 Smooth chill",
      },
    };

    const track = tracks[mood] || tracks.phonk;

    // Verify URL works
    try {
      const check = await fetch(track.url, { method: "HEAD" });
      if (!check.ok) {
        // Fallback to working URL
        track.url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      }
    } catch {
      track.url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    }

    return NextResponse.json({
      success: true,
      track,
      allTracks: Object.values(tracks),
    });

  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
