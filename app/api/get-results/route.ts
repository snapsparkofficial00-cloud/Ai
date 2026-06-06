import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    const headers = {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    };

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ai_results?order=created_at.desc&limit=50`,
      { headers }
    );
    
    const results = await res.json();
    
    return NextResponse.json({ 
      success: true, 
      results: Array.isArray(results) ? results : [],
      count: Array.isArray(results) ? results.length : 0
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err), results: [] });
  }
}
