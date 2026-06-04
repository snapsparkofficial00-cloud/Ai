import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const execAsync = promisify(exec);

export async function POST(req: Request) {
  const tmpDir = "/tmp/video-compose";
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  try {
    const { clipUrls, voiceUrl, musicUrl } = await req.json();
    if (!clipUrls || clipUrls.length === 0) {
      return NextResponse.json({ error: "No clips provided" }, { status: 400 });
    }

    const sessionId = uuidv4();
    const clipFiles: string[] = [];

    // Download clips
    for (let i = 0; i < clipUrls.length; i++) {
      const res = await fetch(clipUrls[i]);
      const buffer = await res.arrayBuffer();
      const filePath = path.join(tmpDir, `clip_${sessionId}_${i}.mp4`);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      clipFiles.push(filePath);
    }

    // Download voice
    let voiceFile = "";
    if (voiceUrl) {
      const res = await fetch(voiceUrl);
      const buffer = await res.arrayBuffer();
      voiceFile = path.join(tmpDir, `voice_${sessionId}.mp3`);
      fs.writeFileSync(voiceFile, Buffer.from(buffer));
    }

    // Download music (optional)
    let musicFile = "";
    if (musicUrl) {
      const res = await fetch(musicUrl);
      const buffer = await res.arrayBuffer();
      musicFile = path.join(tmpDir, `music_${sessionId}.mp3`);
      fs.writeFileSync(musicFile, Buffer.from(buffer));
    }

    // Create concat list
    const listFile = path.join(tmpDir, `list_${sessionId}.txt`);
    const listContent = clipFiles.map(f => `file '${f}'`).join("\n");
    fs.writeFileSync(listFile, listContent);

    const outputFile = path.join(tmpDir, `output_${sessionId}.mp4`);

    let ffmpegCmd = `ffmpeg -f concat -safe 0 -i ${listFile} -c:v libx264 -preset fast -crf 23 `;
    if (voiceFile && musicFile) {
      ffmpegCmd += `-i ${voiceFile} -i ${musicFile} -filter_complex "[1:a][2:a]amix=inputs=2:duration=longest[a]" -map 0:v -map "[a]" -c:v copy -c:a aac `;
    } else if (voiceFile) {
      ffmpegCmd += `-i ${voiceFile} -c:v copy -c:a aac -map 0:v -map 1:a `;
    } else if (musicFile) {
      ffmpegCmd += `-i ${musicFile} -c:v copy -c:a aac -map 0:v -map 1:a `;
    } else {
      ffmpegCmd += `-c copy `;
    }
    ffmpegCmd += `-shortest ${outputFile}`;

    await execAsync(ffmpegCmd);

    const outputBuffer = fs.readFileSync(outputFile);
    const base64 = outputBuffer.toString("base64");
    const dataUrl = `data:video/mp4;base64,${base64}`;

    // Cleanup temp files
    [listFile, outputFile, voiceFile, musicFile, ...clipFiles].forEach(f => {
      if (f && fs.existsSync(f)) fs.unlinkSync(f);
    });

    return NextResponse.json({ success: true, videoUrl: dataUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
