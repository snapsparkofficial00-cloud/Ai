import { NextResponse } from "next/server";

const RENDER_URL = process.env.RENDER_BACKEND_URL || "https://ai-os-v6jw.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    const endpoints: Record<string, string> = {
      "generate-script": "/generate-script",
      "generate-voice": "/generate-voice",
      "get-footage": "/get-footage",
      "create-video": "/create-video",
    };

    const endpoint = endpoints[action];
    if (!endpoint) {
      return NextResponse.json({ error: "Unknown action" });
    }

    const res = await fetch(`${RENDER_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    const url = jobId
      ? `${RENDER_URL}/job/${jobId}`
      : `${RENDER_URL}/`;

    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
