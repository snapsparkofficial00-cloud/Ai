import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    // Get ALL real data from Supabase
    const [websites, projects, deployed, results, aiActivity] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/websites?select=count`, { headers: headers() }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/rest/v1/website_projects?select=count`, { headers: headers() }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/rest/v1/deployed_sites?select=count`, { headers: headers() }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/rest/v1/ai_results?select=*&order=created_at.desc&limit=50`, { headers: headers() }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/rest/v1/ai_activity?select=*&order=created_at.desc&limit=100`, { headers: headers() }).then(r => r.json()),
    ]);

    // Calculate real stats
    const totalWebsites = (websites?.[0]?.count || 0) + (projects?.[0]?.count || 0);
    const totalDeployed = deployed?.[0]?.count || 0;
    const totalContent = (aiActivity || []).length;

    // Group by type
    const byType: any = {};
    (results || []).forEach((r: any) => {
      byType[r.type] = (byType[r.type] || 0) + 1;
    });

    // Group by date
    const byDate: any = {};
    (aiActivity || []).forEach((a: any) => {
      const date = new Date(a.created_at).toLocaleDateString();
      byDate[date] = (byDate[date] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      data_source: "Supabase - REAL DATA",
      stats: {
        totalWebsites,
        totalDeployed,
        totalContent,
        byType,
        byDate,
        lastActivity: (aiActivity || [])[0]?.created_at || "No activity yet",
      },
      recentResults: (results || []).slice(0, 20),
      recentActivity: (aiActivity || []).slice(0, 20),
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

function headers() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
}
