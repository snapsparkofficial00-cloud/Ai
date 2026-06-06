import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

export async function POST(req: Request) {
  try {
    const { action, websiteId, html, niche } = await req.json();

    switch (action) {
      case "deploy-to-vercel":
        return await deployToVercel(html, niche);
      case "deploy-from-db":
        return await deployFromDatabase(websiteId);
      case "auto-deploy-all":
        return await autoDeployAll();
      case "get-deployed-sites":
        return await getDeployedSites();
      default:
        return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function deployToVercel(html: string, niche: string) {
  const siteName = niche.replace(/\s+/g, "-").toLowerCase().slice(0, 30);
  
  if (!VERCEL_TOKEN) {
    // Fallback: Save as a downloadable file
    const fileName = `${siteName}-${Date.now()}.html`;
    
    await fetch(`${SUPABASE_URL}/rest/v1/deployed_sites`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        niche,
        site_name: siteName,
        html_code: html,
        status: "ready_to_deploy",
        deployed_url: `https://${siteName}.vercel.app`,
        created_at: new Date().toISOString(),
      }),
    });

    return NextResponse.json({
      success: true,
      status: "ready_to_deploy",
      url: `https://${siteName}.vercel.app`,
      message: "Add VERCEL_TOKEN to auto-deploy. Manual: vercel.com/new → drag & drop HTML file",
      deploySteps: [
        "1. Download the HTML file",
        "2. Go to vercel.com/new",
        "3. Drag & drop the file",
        "4. Website is LIVE in 10 seconds!",
      ],
    });
  }

  // Real Vercel deployment
  try {
    const deployRes = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
      body: JSON.stringify({
        name: siteName,
        files: [{ file: "index.html", data: html }],
        projectSettings: { framework: null },
        target: "production",
      }),
    });

    const deployData = await deployRes.json();

    // Save to database
    await fetch(`${SUPABASE_URL}/rest/v1/deployed_sites`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        niche,
        site_name: siteName,
        html_code: html,
        status: "deployed",
        deployed_url: deployData.url || `https://${siteName}.vercel.app`,
        deployment_id: deployData.id,
        created_at: new Date().toISOString(),
      }),
    });

    return NextResponse.json({
      success: true,
      status: "deployed",
      url: deployData.url,
      deploymentId: deployData.id,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function deployFromDatabase(websiteId: number) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/websites?id=eq.${websiteId}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const sites = await res.json();
  if (!sites.length) return NextResponse.json({ success: false, error: "Website not found" });

  const site = sites[0];
  return await deployToVercel(site.html_code, site.niche);
}

async function autoDeployAll() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/websites?status=eq.draft&limit=5`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const sites = await res.json();
  
  const results = [];
  for (const site of sites) {
    const result = await deployToVercel(site.html_code, site.niche);
    results.push({ niche: site.niche, result });
  }

  return NextResponse.json({ success: true, deployed: results.length, results });
}

async function getDeployedSites() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/deployed_sites?order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const sites = await res.json();
  return NextResponse.json({ success: true, sites: Array.isArray(sites) ? sites : [], count: sites?.length || 0 });
}
