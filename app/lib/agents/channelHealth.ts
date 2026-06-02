interface HealthMetrics {
  score: number;
  status: "Excellent" | "Good" | "Needs Attention" | "Critical";
  metrics: {
    subscriberGrowth: number;
    viewVelocity: number;
    engagementRate: number;
    uploadConsistency: number;
    ctr: number;
  };
  recommendations: string[];
}

export async function getChannelHealth(channelId?: string): Promise<HealthMetrics> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  let performanceData: any[] = [];
  
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/performance?select=*&order=trackedAt.desc&limit=30`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      });
      performanceData = await res.json();
    } catch {}
  }
  
  let score = 75;
  let recommendations: string[] = [];
  
  if (performanceData.length > 0) {
    const avgScore = performanceData.reduce((a: any, b: any) => a + (b.score || 0), 0) / performanceData.length;
    score = Math.min(100, Math.max(0, avgScore));
    
    if (score < 50) recommendations.push("Improve video quality and thumbnails");
    if (score < 70) recommendations.push("Post more consistently");
    if (score > 80) recommendations.push("Continue current strategy - it's working!");
  } else {
    recommendations.push("Upload first video to generate health data");
    recommendations.push("Set up YouTube OAuth for analytics");
  }
  
  let status: HealthMetrics["status"] = "Good";
  if (score >= 80) status = "Excellent";
  else if (score >= 60) status = "Good";
  else if (score >= 40) status = "Needs Attention";
  else status = "Critical";
  
  return {
    score,
    status,
    metrics: {
      subscriberGrowth: performanceData.length > 0 ? (performanceData[0]?.views || 0) / 100 : 0,
      viewVelocity: performanceData.length > 0 ? performanceData.length * 10 : 0,
      engagementRate: performanceData.length > 0 ? (performanceData[0]?.likes || 0) / (performanceData[0]?.views || 1) * 100 : 0,
      uploadConsistency: performanceData.length,
      ctr: performanceData.length > 0 ? (performanceData[0]?.ctr || 12) : 12,
    },
    recommendations,
  };
}
