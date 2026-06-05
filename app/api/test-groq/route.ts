import { NextResponse } from "next/server";

export async function GET() {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_KEY) {
    return NextResponse.json({ 
      status: "MISSING", 
      message: "GROQ_API_KEY is NOT in environment variables",
      fix: "Add GROQ_API_KEY in Vercel Settings → Environment Variables → Redeploy"
    });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 10,
        messages: [{ role: "user", content: "Say hi" }],
      }),
    });

    const data = await res.json();
    
    if (data.choices) {
      return NextResponse.json({ 
        status: "WORKING", 
        keyPrefix: GROQ_KEY.slice(0, 10) + "...",
        response: data.choices[0]?.message?.content
      });
    } else {
      return NextResponse.json({ 
        status: "INVALID_KEY", 
        error: JSON.stringify(data).slice(0, 200)
      });
    }
  } catch (err) {
    return NextResponse.json({ status: "ERROR", message: String(err) });
  }
}
