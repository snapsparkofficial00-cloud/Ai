import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { niche, websiteUrl, action } = await req.json();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    switch (action) {
      case "seo-plan": return await generateSEOPlan(niche, GEMINI_KEY!);
      case "content-calendar": return await generateContentCalendar(niche, GEMINI_KEY!);
      case "social-posts": return await generateSocialPosts(niche, websiteUrl, GEMINI_KEY!);
      case "backlink-strategy": return await generateBacklinkStrategy(niche, GEMINI_KEY!);
      case "viral-strategy": return await generateViralStrategy(niche, GEMINI_KEY!);
      case "full-traffic-plan": return await generateFullTrafficPlan(niche, websiteUrl, GEMINI_KEY!);
      default: return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function generateSEOPlan(niche: string, apiKey: string) {
  const prompt = `Create a COMPLETE 90-day SEO plan for: ${niche}

Include:
1. 50 LOW-COMPETITION keywords with monthly search volume (realistic estimates)
2. Content clusters and pillar page strategy
3. Technical SEO checklist
4. Internal linking strategy
5. Schema markup recommendations
6. Featured snippet optimization
7. Local SEO (if applicable)
8. Mobile optimization tips
9. Core Web Vitals optimization
10. Monthly traffic projections

Format as actionable checklist with timeline.`;

  return await callAI(prompt, apiKey, "seo-plan");
}

async function generateContentCalendar(niche: string, apiKey: string) {
  const prompt = `Create a 30-DAY viral content calendar for: ${niche}

For EACH day provide:
- Article title (clickbait, viral style)
- Target keyword
- Meta description
- Content outline (H2, H3 structure)
- Intro hook
- Word count target
- Internal links to include
- Social media caption
- Pinterest pin description
- Estimated traffic potential

Make every title VIRAL and click-worthy.`;

  return await callAI(prompt, apiKey, "content-calendar");
}

async function generateSocialPosts(niche: string, url: string, apiKey: string) {
  const prompt = `Create 50 SOCIAL MEDIA POSTS for: ${niche}
Website: ${url || "yourwebsite.com"}

For EACH platform provide 10 posts:
- Instagram (captions + hashtag sets)
- Facebook (post + link description)
- Twitter/X (threads)
- Pinterest (pin descriptions)
- LinkedIn (professional posts)

Make them VIRAL and shareable. Include call-to-action to visit website.`;

  return await callAI(prompt, apiKey, "social-posts");
}

async function generateBacklinkStrategy(niche: string, apiKey: string) {
  const prompt = `Create BACKLINK STRATEGY for: ${niche}

Include:
1. 20 websites to reach out for guest posts (with email templates)
2. HARO pitch templates
3. Broken link building opportunities
4. Skyscraper technique targets
5. Resource page link targets
6. Competitor backlink analysis
7. Digital PR ideas
8. Infographic outreach plan
9. Podcast guest pitch template
10. Timeline: Week 1-12 action plan`;

  return await callAI(prompt, apiKey, "backlink-strategy");
}

async function generateViralStrategy(niche: string, apiKey: string) {
  const prompt = `Create VIRAL GROWTH STRATEGY for: ${niche}

Include:
1. Viral content formulas for this niche
2. Trending topics to cover now
3. Controversial angles that get shares
4. Emotional triggers for this audience
5. Influencer collaboration ideas
6. User-generated content strategy
7. Challenge/hashtag ideas
8. Cross-platform promotion plan
9. Viral loop mechanics
10. Growth hacking techniques`;

  return await callAI(prompt, apiKey, "viral-strategy");
}

async function generateFullTrafficPlan(niche: string, url: string, apiKey: string) {
  const prompt = `Create ULTIMATE TRAFFIC GENERATION PLAN for: ${niche}
Website: ${url || "yourwebsite.com"}

INCLUDE EVERYTHING:

1. MONTH 1: FOUNDATION (Day-by-day plan)
   - Days 1-7: Technical setup, Google Search Console, sitemap
   - Days 8-14: First 10 articles published
   - Days 15-21: Social media profiles optimized
   - Days 22-30: First backlink outreach

2. MONTH 2: GROWTH
   - Content velocity: 2 articles/day
   - Pinterest strategy: 10 pins/day
   - Quora/Reddit: 5 answers/day with links
   - Guest post: 2 guest posts

3. MONTH 3: ACCELERATION
   - Content: 3 articles/day
   - YouTube videos: 2/week
   - Email list: Lead magnet + welcome sequence
   - HARO: 5 pitches/week

4. MONTH 4-6: DOMINATION
   - Podcast appearances
   - Viral content push
   - Community building
   - Paid ads testing

5. TRAFFIC PROJECTIONS:
   - Month 1: 500-1000 visitors
   - Month 3: 5,000-10,000 visitors
   - Month 6: 50,000-100,000 visitors
   - Month 12: 500,000+ visitors

6. MONETIZATION MILESTONES:
   - When to apply for AdSense
   - When to add affiliate links
   - When to create products
   - Revenue projections at each stage`;

  return await callAI(prompt, apiKey, "full-traffic-plan");
}

async function callAI(prompt: string, apiKey: string, action: string) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 4000, temperature: 0.8 },
        }),
      }
    );
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return NextResponse.json({ success: true, action, result: text });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
