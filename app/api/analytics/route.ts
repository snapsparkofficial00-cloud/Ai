import { NextResponse } from "next/server";

export async function GET() {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return NextResponse.json({ 
        success: true,
        stats: { totalWebsites: 0, totalDeployed: 0, totalContent: 0 },
        recentResults: [],
        recentActivity: [],
        message: "Supabase not configured" 
      });
    }

    const headers = {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    };

    // Fetch data
    const [results, activity, websites, projects, deployed] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/ai_results?order=created_at.desc&limit=50`, { headers }).then(r => r.json()).catch(() => []),
      fetch(`${SUPABASE_URL}/rest/v1/ai_activity?order=created_at.desc&limit=100`, { headers }).then(r => r.json()).catch(() => []),
      fetch(`${SUPABASE_URL}/rest/v1/websites?select=count`, { headers }).then(r => r.json()).catch(() => [{}]),
      fetch(`${SUPABASE_URL}/rest/v1/website_projects?select=count`, { headers }).then(r => r.json()).catch(() => [{}]),
      fetch(`${SUPABASE_URL}/rest/v1/deployed_sites?select=count`, { headers }).then(r => r.json()).catch(() => [{}]),
    ]);

    const totalWebsites = (Array.isArray(websites) ? websites[0]?.count : 0) + (Array.isArray(projects) ? projects[0]?.count : 0);
    const totalDeployed = Array.isArray(deployed) ? deployed[0]?.count || 0 : 0;
    const totalContent = Array.isArray(activity) ? activity.length : 0;

    return NextResponse.json({
      success: true,
      data_source: "Supabase - REAL DATA",
      stats: { totalWebsites, totalDeployed, totalContent },
      recentResults: Array.isArray(results) ? results.slice(0, 20) : [],
      recentActivity: Array.isArray(activity) ? activity.slice(0, 20) : [],
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
      }
