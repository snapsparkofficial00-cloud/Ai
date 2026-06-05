import { NextResponse } from "next/server";

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
  try {
    const { action, niche, websiteUrl, websiteName, channelName, competitorChannel } = await req.json();

    switch (action) {
      // Video Production
      case "script": return await generateViralScript(niche, websiteUrl);
      case "voice": return await generateVoiceover(niche);
      case "hashtags": return await generateViralHashtags(niche);
      case "description": return await generateSEODescription(niche, websiteUrl);
      case "thumbnail-prompt": return await generateThumbnailPrompt(niche);
      case "video-ideas": return await generateVideoIdeas(niche);
      case "music-suggestions": return await getMusicSuggestions(niche);
      
      // Channel Growth
      case "channel-analysis": return await analyzeChannel(channelName);
      case "competitor-analysis": return await analyzeCompetitors(competitorChannel);
      case "growth-strategy": return await generateGrowthStrategy(niche);
      case "viral-prediction": return await predictViralTopics(niche);
      case "best-upload-time": return await bestUploadTime(niche);
      
      // Website Promotion
      case "website-promo-video": return await createWebsitePromoVideo(websiteName, websiteUrl, niche);
      case "affiliate-strategy": return await generateAffiliateStrategy(niche, websiteUrl);
      case "cross-promotion": return await crossPromotionPlan(websiteName, niche);
      
      // Full Automation
      case "auto-promote-website": return await autoPromoteWebsite(websiteName, websiteUrl, niche);
      case "full-channel-automation": return await fullChannelAutomation(niche, websiteUrl);
      
      default: return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== VIDEO PRODUCTION ==========

async function generateViralScript(niche: string, websiteUrl?: string) {
  const prompt = `Create 3 VIRAL YouTube Shorts scripts for: "${niche}".

EACH SCRIPT:
- Duration: 40-60 seconds
- Language: Hindi + English mix (Hinglish)
- Hook: First 2 seconds MUST shock/grab attention
- Middle: Valuable content/facts/entertainment
- End: Strong CTA "${websiteUrl ? `→ Visit: ${websiteUrl}` : '→ Like, Share, Subscribe!'}"

SCRIPT 1: Educational/Facts
SCRIPT 2: Entertainment/Story
SCRIPT 3: Controversial/Hot Take

For each: Title, Hook, Full Script, CTA, Estimated viral score /10`;

  return await callAI(prompt, "script");
}

async function generateVoiceover(niche: string) {
  const prompt = `Recommend the BEST AI voice for YouTube videos about ${niche}.
  
Consider:
- Indian audience (Hindi/Hinglish)
- Professional tone
- Available on free platforms
- Best voice settings (pitch, speed)

Recommend 3 voices with settings.`;
  return await callAI(prompt, "voice");
}

async function generateViralHashtags(niche: string) {
  const prompt = `Generate 30 VIRAL hashtags for YouTube Shorts about: "${niche}".

Mix of:
- High-volume hashtags (1M+ searches)
- Medium-volume (100K+)
- Niche-specific
- Trending right now
- Hindi + English mix

Return as: #hashtag1 #hashtag2 #hashtag3 ...`;
  return await callAI(prompt, "hashtags");
}

async function generateSEODescription(niche: string, websiteUrl?: string) {
  const prompt = `Write a PERFECT YouTube description for a video about: "${niche}".

Include:
1. First 2 lines (visible before "show more") - Hook with keywords
2. Video summary (100 words)
3. Timestamps (if applicable)
4. ${websiteUrl ? `Website: ${websiteUrl}` : ''}
5. Affiliate links section (placeholder)
6. Social media links
7. 30 hashtags
8. "Subscribe for more" CTA

Optimize for YouTube SEO. Use primary keyword 3-5 times naturally.`;
  return await callAI(prompt, "description");
}

async function generateThumbnailPrompt(niche: string) {
  const prompt = `Create 5 YouTube thumbnail design concepts for: "${niche}".

Each concept:
- Visual description
- Text overlay (bold, large)
- Color scheme
- Facial expression (if person)
- Contrast elements
- CTR prediction /10

Make them VIRAL and click-worthy. Think MrBeast style.`;
  return await callAI(prompt, "thumbnail");
}

async function generateVideoIdeas(niche: string) {
  const prompt = `Generate 50 VIRAL video ideas for YouTube channel about: "${niche}".

Categorize as:
1. SHORTS (20 ideas) - 30-60 seconds
2. LONG FORM (15 ideas) - 8-15 minutes  
3. LIVE STREAMS (5 ideas)
4. SERIES (5 ideas) - multi-part
5. TRENDING NOW (5 ideas) - current events

For each: Title, format, estimated views potential, difficulty /10`;
  return await callAI(prompt, "video-ideas");
}

async function getMusicSuggestions(niche: string) {
  const prompt = `Recommend background music for YouTube videos about: "${niche}".

For each recommendation:
- Genre/style
- Mood
- Where to get (free/royalty-free)
- Best use case (intro, background, outro)
- Example track names

Suggest 10 tracks from YouTube Audio Library and Pixabay Music.`;
  return await callAI(prompt, "music");
}

// ========== CHANNEL GROWTH ==========

async function analyzeChannel(channelName: string) {
  const prompt = `Analyze YouTube channel: "${channelName || 'my channel'}".

Provide:
1. Content strategy score /100
2. SEO optimization score /100
3. Thumbnail effectiveness /100
4. Audience retention tips
5. Content gaps to fill
6. Collaboration opportunities
7. Monetization optimization
8. Top 5 immediate improvements
9. 30-day growth plan
10. 90-day domination plan`;
  return await callAI(prompt, "channel-analysis");
}

async function analyzeCompetitors(competitor: string) {
  const prompt = `Analyze YouTube competitor: "${competitor || 'top channel in my niche'}".

Reveal:
1. Their content strategy (reverse engineered)
2. Their SEO secrets
3. Their thumbnail formula
4. Their audience engagement tactics
5. Their posting schedule
6. Their weaknesses to exploit
7. Content gaps they missed
8. How to BEAT them in 30 days
9. Keywords they rank for
10. Your competitive advantage`;
  return await callAI(prompt, "competitor-analysis");
}

async function generateGrowthStrategy(niche: string) {
  const prompt = `Create ULTIMATE YouTube growth strategy for: "${niche}".

MONTH 1 (Foundation):
- Day 1-7: Channel setup, branding, first 7 videos
- Day 8-14: SEO optimization, thumbnail testing
- Day 15-21: Community building, comments strategy
- Day 22-30: Collaboration outreach

MONTH 2 (Growth):
- Content velocity: 1 short/day + 2 long/week
- Viral trend jacking strategy
- Cross-platform promotion

MONTH 3 (Monetization):
- AdSense optimization
- Affiliate marketing integration
- Sponsorship pitching
- Product creation

TARGETS: Subscribers, views, revenue projections`;
  return await callAI(prompt, "growth-strategy");
}

async function predictViralTopics(niche: string) {
  const prompt = `Predict NEXT 30 DAYS of viral topics for: "${niche}".

For each prediction:
- Topic/trend
- Why it will go viral
- Best format (short/long/live)
- Optimal posting date
- Estimated view potential
- Competition level

Also predict: Upcoming trending hashtags, seasonal trends, event-based content.`;
  return await callAI(prompt, "viral-prediction");
}

async function bestUploadTime(niche: string) {
  const prompt = `Analyze BEST upload times for YouTube in: "${niche}" (Indian audience).

For each day of week:
- Best time slot (IST)
- Why this time works
- Content type for this slot
- Expected engagement boost

Include: Best days for Shorts vs Long form, best time for live streams.`;
  return await callAI(prompt, "upload-time");
}

// ========== WEBSITE PROMOTION ==========

async function createWebsitePromoVideo(websiteName: string, websiteUrl: string, niche: string) {
  const prompt = `Create a COMPLETE YouTube Shorts promo plan for website: "${websiteName}" (${websiteUrl}).

Niche: ${niche}

Generate:
1. 5 VIRAL Shorts scripts that promote the website
2. Each script subtly mentions ${websiteUrl}
3. Hook ideas that make people click
4. Thumbnail concepts
5. Best hashtags
6. Call-to-action phrases
7. Affiliate link placement strategy
8. Series idea: "5 reasons to visit ${websiteName}"

Scripts must be:
- Entertaining first, promotional second
- 80% value, 20% promotion
- Include trending audio suggestions
- Viral hook at start of each`;
  return await callAI(prompt, "website-promo");
}

async function generateAffiliateStrategy(niche: string, websiteUrl: string) {
  const prompt = `Create AFFILIATE MARKETING strategy for YouTube channel about: "${niche}".

Website to promote: ${websiteUrl}

Include:
1. Top 20 affiliate programs for this niche
2. Amazon/Flipkart products with high commission
3. How to naturally mention ${websiteUrl} in videos
4. Description template with affiliate links
5. Pinned comment strategy
6. Community post promotion
7. Link in bio optimization
8. Revenue projection: 10K views = $X, 100K views = $X, 1M views = $X`;
  return await callAI(prompt, "affiliate-strategy");
}

async function crossPromotionPlan(websiteName: string, niche: string) {
  const prompt = `Create CROSS-PROMOTION plan between website "${websiteName}" and YouTube channel.

Niche: ${niche}

Strategy:
1. YouTube → Website traffic funnel
2. Website → YouTube subscriber conversion
3. Email list building from both
4. Social media integration
5. Content repurposing: Blog → Video, Video → Blog
6. Community building across platforms
7. Exclusive content strategy
8. 90-day synergy plan with metrics`;
  return await callAI(prompt, "cross-promotion");
}

// ========== FULL AUTOMATION ==========

async function autoPromoteWebsite(websiteName: string, websiteUrl: string, niche: string) {
  const results: any = {};
  
  results.scripts = await generateViralScript(niche, websiteUrl);
  results.hashtags = await generateViralHashtags(niche);
  results.description = await generateSEODescription(niche, websiteUrl);
  results.thumbnail = await generateThumbnailPrompt(niche);
  results.music = await getMusicSuggestions(niche);
  results.videoIdeas = await generateVideoIdeas(niche);
  results.growthStrategy = await generateGrowthStrategy(niche);
  results.affiliate = await generateAffiliateStrategy(niche, websiteUrl);

  return NextResponse.json({
    success: true,
    action: "auto-promote-website",
    websiteName,
    websiteUrl,
    niche,
    plan: {
      daily: "Post 1 Short promoting website",
      weekly: "1 Long video + 5 Shorts",
      monthly: "Full analysis + strategy update",
      estimatedReach: "100K+ views/month",
      estimatedWebsiteTraffic: "10K+ visitors/month from YouTube",
    },
    results,
    nextSteps: [
      "1. Create videos using scripts above",
      "2. Add hashtags and descriptions",
      "3. Use AI thumbnails",
      "4. Post consistently for 30 days",
      "5. Track analytics and optimize",
    ]
  });
}

async function fullChannelAutomation(niche: string, websiteUrl: string) {
  const results: any = {};
  
  results.scripts = await generateViralScript(niche, websiteUrl);
  results.ideas = await generateVideoIdeas(niche);
  results.growth = await generateGrowthStrategy(niche);
  results.viral = await predictViralTopics(niche);
  results.uploadTime = await bestUploadTime(niche);
  results.hashtags = await generateViralHashtags(niche);
  results.description = await generateSEODescription(niche, websiteUrl);
  results.thumbnail = await generateThumbnailPrompt(niche);
  results.music = await getMusicSuggestions(niche);

  return NextResponse.json({
    success: true,
    action: "full-channel-automation",
    niche,
    automationPlan: {
      schedule: "1 Short/day + 3 Long videos/week",
      contentMix: "60% Viral, 25% Educational, 15% Promotional",
      growthTarget: "100K subscribers in 6 months",
      revenueTarget: "$5,000/month by month 6",
    },
    dailyChecklist: [
      "✅ Post 1 Short at optimal time",
      "✅ Reply to all comments within 1 hour",
      "✅ Engage with 10 similar channels",
      "✅ Check analytics, adjust strategy",
      "✅ Research 3 trending topics",
    ],
    results,
  });
}

// ========== AI HELPER ==========

async function callAI(prompt: string, type: string) {
  // Try Gemini first
  if (GEMINI_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 4000, temperature: 0.9 } }),
        }
      );
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return NextResponse.json({ success: true, type, result: text });
    } catch {}
  }

  // Fallback to Groq
  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 4000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      return NextResponse.json({ success: true, type, result: data?.choices?.[0]?.message?.content || "" });
    } catch {}
  }

  return NextResponse.json({ success: false, error: "No AI API available" });
}
