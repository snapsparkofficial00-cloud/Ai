import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// GET all projects
export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/website_projects?order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    const projects = await res.json();
    return NextResponse.json({ success: true, projects });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// POST - Save new project
export async function POST(req: Request) {
  try {
    const { id, niche, websiteCode, pages } = await req.json();
    
    const res = await fetch(`${SUPABASE_URL}/rest/v1/website_projects`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        id,
        niche,
        website_code: websiteCode,
        pages: pages || {},
        created_at: new Date().toISOString(),
      }),
    });
    
    const data = await res.json();
    return NextResponse.json({ success: true, project: data });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// DELETE - Remove project
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    await fetch(`${SUPABASE_URL}/rest/v1/website_projects?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
