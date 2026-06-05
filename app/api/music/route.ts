import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mood = searchParams.get("mood") || "epic";

    const PIXABAY_KEY = process.env.PIXABAY_API_KEY
      || process.env.PIXAB_KEY
      || process.env.PIXABAY_KEY;

    // Pixabay free music API
    const queries: Record<string, string> = {
      epic: "epic cinematic",
      phonk: "dark hip hop",
      motivational: "motivational upbeat",
      dramatic: "dramatic intense",
      chill: "chill background",
    };

    const query = queries[mood] || queries.epic;

    const res = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&media_type=music&per_page=10`,
    );

    // Pixabay doesn't have music API - use free music sources instead
    // These are copyright-free music URLs
    const freeMusicTracks = [
      {
        name: "Epic Cinematic",
        mood: "epic",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: 372,
      },
      {
        name: "Dark Phonk Beat",
        mood: "phonk",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: 370,
      },
      {
        name: "Motivational Rise",
        mood: "motivational",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: 214,
      },
      {
        name: "Dramatic Tension",
        mood: "dramatic",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: 289,
      },
      {
        name: "Chill Vibes",
        mood: "chill",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: 367,
      },
    ];

    const track = freeMusicTracks.find((t) => t.mood === mood)
      || freeMusicTracks[0];

    return NextResponse.json({
      success: true,
      track,
      allTracks: freeMusicTracks,
    });

  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
