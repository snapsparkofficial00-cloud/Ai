import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { action, niche, domain, monetization, target, competitors, evolutionStage, data } = await req.json();
    const GROQ_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_KEY) {
      return NextResponse.json({ success: false, error: "GROQ_API_KEY not set" });
    }

    switch (action) {
      // Strategy Actions
      case "genesis": return await genesisCreation(niche, GROQ_KEY);
      case "evolve": return await selfEvolution(niche, evolutionStage, GROQ_KEY);
      case "monetize": return await neuralMonetization(niche, monetization, GROQ_KEY);
      case "traffic": return await quantumTraffic(niche, target, GROQ_KEY);
      case "seo": return await predictiveSEO(niche, competitors, GROQ_KEY);
      case "content": return await autonomousContent(niche, GROQ_KEY);
      case "design": return await neuralDesign(niche, GROQ_KEY);
      case "ads": return await neuralAds(niche, GROQ_KEY);
      case "empire": return await empireExpansion(niche, GROQ_KEY);
      case "analyze": return await deepAnalysis(domain, GROQ_KEY);
      case "clone": return await competitorClone(competitors, GROQ_KEY);
      
      // Builder Actions
      case "build-site": return await buildRealWebsite(niche, GROQ_KEY);
      case "generate-pages": return await generateAllPages(niche, GROQ_KEY);
      
      default: return NextResponse.json({ success: false, error: `Unknown action: ${action}` });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== STRATEGY FUNCTIONS ==========

async function genesisCreation(niche: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 4000,
      messages: [
        { role: "system", content: `Create a complete website empire blueprint for: ${niche}. Return as JSON with: website name, domain ideas, 15+ pages, 50 article titles, SEO keywords, monetization plan, design specs, revenue projections.` },
        { role: "user", content: `Build complete blueprint for ${niche}` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "genesis", blueprint: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function selfEvolution(niche: string, stage: number, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Provide evolution plan stage ${stage + 1}/5 for ${niche} website. Include: new features, content upgrades, monetization improvements, traffic tactics, design evolution.` },
        { role: "user", content: `Evolve my ${niche} website` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "evolve", evolution: data?.choices?.[0]?.message?.content, stage: stage + 1, timestamp: new Date().toISOString() });
}

async function neuralMonetization(niche: string, method: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Create monetization strategy for ${niche}. Include: AdSense optimization, affiliate programs, digital products, services, newsletter, sponsorship. Give estimated revenue ranges.` },
        { role: "user", content: `Monetize my ${niche} website` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "monetize", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function quantumTraffic(niche: string, target: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Create traffic strategy to reach ${target} visitors/month for ${niche}. Include: SEO, social media, content marketing, backlinks, paid ads, community building, growth hacks. Give timeline.` },
        { role: "user", content: `Get ${target} visitors for ${niche}` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "traffic", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function predictiveSEO(niche: string, competitors: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Create SEO strategy for ${niche}. Include: keyword strategy, content clusters, technical SEO, backlink strategy, E-E-A-T optimization. Competitors: ${competitors || "top sites in niche"}.` },
        { role: "user", content: `SEO strategy for ${niche}` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "seo", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function autonomousContent(niche: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 4000,
      messages: [
        { role: "system", content: `Create 30-day content calendar for ${niche}. For each article: viral title, meta description, target keywords, content outline, intro hook. Include content clusters and pillar strategy.` },
        { role: "user", content: `Content calendar for ${niche}` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "content", calendar: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function neuralDesign(niche: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Create design specification for ${niche} website. Include: color palette, typography, layout, component ideas, animation suggestions, UI elements. Dark theme, modern, glassmorphism.` },
        { role: "user", content: `Design for ${niche}` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "design", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function neuralAds(niche: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Create ad revenue strategy for ${niche}. Include: AdSense placement, ad networks, direct ad sales pricing, sponsored content, affiliate integration. Give estimated revenue at 10K/50K/100K visitors.` },
        { role: "user", content: `Ad strategy for ${niche}` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "ads", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function empireExpansion(niche: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Create empire expansion plan from ${niche}. Include: 10 related niches, interlinking strategy, shared resources, cross-promotion, 5-year growth projection with revenue estimates.` },
        { role: "user", content: `Expand empire from ${niche}` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "empire", plan: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function deepAnalysis(domain: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Analyze website ${domain || "in " + niche}. Provide: SEO audit, monetization audit, content audit, traffic estimation, competitor analysis, improvement roadmap with timeline. Score out of 100.` },
        { role: "user", content: `Analyze ${domain || "my website"}` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "analyze", analysis: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

async function competitorClone(competitors: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 3000,
      messages: [
        { role: "system", content: `Analyze competitors: ${competitors || "top sites"}. Provide: reverse engineering of their strategy, content gaps, superior strategy to beat them, execution plan week by week.` },
        { role: "user", content: `Clone and beat competitors` }
      ],
    }),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, action: "clone", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
}

// ========== BUILDER FUNCTIONS ==========

async function buildRealWebsite(niche: string, apiKey: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 8000,
      messages: [
        { role: "system", content: "Generate complete HTML website. Output ONLY in ```html ``` blocks. Include CSS in <style>, JS in <script>. Modern dark theme, glassmorphism, animations, responsive, hero, features, about, services, testimonials, pricing, contact, footer." },
        { role: "user", content: `Build complete premium website for: ${niche}` }
      ],
    }),
  });
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content || "";
  const htmlMatch = content.match(/```html\n?([\s\S]*?)```/);
  return NextResponse.json({ success: true, action: "build-site", website: htmlMatch ? htmlMatch[1] : content, timestamp: new Date().toISOString() });
}

async function generateAllPages(niche: string, apiKey: string) {
  const pages = ["about", "services", "blog", "contact", "pricing", "faq"];
  const generatedPages: Record<string, string> = {};
  
  for (const page of pages) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", max_tokens: 4000,
          messages: [
            { role: "system", content: "Generate HTML page. Output ONLY in ```html ``` blocks." },
            { role: "user", content: `Create "${page}" page for ${niche} website. Dark theme, modern.` }
          ],
        }),
      });
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "";
      const htmlMatch = content.match(/```html\n?([\s\S]*?)```/);
      generatedPages[page] = htmlMatch ? htmlMatch[1] : content;
    } catch { generatedPages[page] = `<h1>${page}</h1>`; }
  }
  
  return NextResponse.json({ success: true, action: "generate-pages", pages: generatedPages, pageCount: Object.keys(generatedPages).length, timestamp: new Date().toISOString() });
}
