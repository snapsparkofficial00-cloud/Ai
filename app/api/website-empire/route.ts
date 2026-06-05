import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { action, niche, domain, monetization, target, competitors, evolutionStage, data } = await req.json();
    const GROQ_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_KEY) {
      return NextResponse.json({ success: false, error: "GROQ_API_KEY not set" });
    }

    switch (action) {
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
      case "build-site": return await buildRealWebsite(niche, GROQ_KEY);
      case "generate-pages": return await generateAllPages(niche, GROQ_KEY);
      default: return NextResponse.json({ success: false, error: `Unknown action: ${action}` });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function genesisCreation(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 4000, messages: [
        { role: "system", content: `Create website empire blueprint for: ${niche}. Include: brand name, domain ideas, pages, articles, SEO, monetization, revenue projections.` },
        { role: "user", content: `Build blueprint for ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "genesis", blueprint: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function selfEvolution(niche: string, stage: number, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `Evolution plan stage ${(stage||0)+1}/5 for ${niche}. New features, content, monetization, traffic, design.` },
        { role: "user", content: `Evolve ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "evolve", evolution: data?.choices?.[0]?.message?.content, stage: (stage||0)+1 });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function neuralMonetization(niche: string, method: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `Monetization for ${niche}: AdSense, affiliate, products, services, newsletter, sponsorship. Revenue estimates.` },
        { role: "user", content: `Monetize ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "monetize", strategy: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function quantumTraffic(niche: string, target: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `Traffic strategy for ${target||"100K"} visitors: SEO, social, content, backlinks, ads, community, growth hacks.` },
        { role: "user", content: `Get ${target||"100K"} visitors for ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "traffic", strategy: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function predictiveSEO(niche: string, competitors: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `SEO for ${niche}: keywords, clusters, technical SEO, backlinks, E-E-A-T. Competitors: ${competitors||"top sites"}.` },
        { role: "user", content: `SEO for ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "seo", strategy: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function autonomousContent(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 4000, messages: [
        { role: "system", content: `30-day content calendar for ${niche}. Each: title, meta, keywords, outline, hook. Content clusters.` },
        { role: "user", content: `Content calendar for ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "content", calendar: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function neuralDesign(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `Design for ${niche}: colors (hex), typography, layout, components, animations. Dark theme, glassmorphism.` },
        { role: "user", content: `Design for ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "design", strategy: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function neuralAds(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `Ad revenue for ${niche}: AdSense, networks, direct sales, sponsored content. Revenue at 10K/50K/100K visitors.` },
        { role: "user", content: `Ad strategy for ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "ads", strategy: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function empireExpansion(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `Empire expansion from ${niche}: 10 related niches, interlinking, cross-promotion, 5-year projection with revenue.` },
        { role: "user", content: `Expand empire from ${niche}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "empire", plan: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function deepAnalysis(domain: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `Analyze: ${domain||"website"}. SEO, monetization, content, traffic, competitors, roadmap. Score/100.` },
        { role: "user", content: `Analyze ${domain||"my website"}` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "analyze", analysis: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function competitorClone(competitors: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 3000, messages: [
        { role: "system", content: `Analyze: ${competitors||"top sites"}. Reverse engineer, content gaps, superior strategy, week-by-week plan.` },
        { role: "user", content: `Clone and beat competitors` }
      ]}),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "clone", strategy: data?.choices?.[0]?.message?.content });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

// ⭐ BUILD REAL WEBSITE
async function buildRealWebsite(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", temperature: 0.7, max_tokens: 8000,
        messages: [
          { role: "system", content: "Generate COMPLETE HTML website. Return RAW HTML starting with <!DOCTYPE html>. Include CSS in <style>, JS in <script>. Dark theme, glassmorphism, modern design. Do NOT wrap in markdown." },
          { role: "user", content: `Build complete website for: "${niche}". Hero, features, about, services, testimonials, pricing, contact, footer. Dark theme with green/blue accents. Font Awesome CDN. Google Fonts. Responsive.` }
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ success: false, error: `Groq error ${res.status}`, details: errText.slice(0, 300) });
    }

    const responseData = await res.json();
    let htmlCode = responseData?.choices?.[0]?.message?.content || "";

    if (!htmlCode) {
      return NextResponse.json({ success: false, error: "Empty response from AI" });
    }

    const htmlMatch = htmlCode.match(/```html\n?([\s\S]*?)```/);
    if (htmlMatch) htmlCode = htmlMatch[1];

    const doctypeIndex = htmlCode.indexOf("<!DOCTYPE");
    const htmlIndex = htmlCode.indexOf("<html");
    const startIndex = doctypeIndex !== -1 ? doctypeIndex : htmlIndex;
    if (startIndex > 0) htmlCode = htmlCode.slice(startIndex);

    return NextResponse.json({ success: true, action: "build-site", website: htmlCode, niche });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err?.message || err) });
  }
}

// ⭐ GENERATE PAGES
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
            { role: "system", content: "Generate HTML page. Return RAW HTML with <!DOCTYPE html>. Dark modern theme. Do NOT wrap in markdown." },
            { role: "user", content: `"${page}" page for ${niche} website. Include nav and footer.` }
          ],
        }),
      });

      const responseData = await res.json();
      let content = responseData?.choices?.[0]?.message?.content || "";
      const htmlMatch = content.match(/```html\n?([\s\S]*?)```/);
      if (htmlMatch) content = htmlMatch[1];
      generatedPages[page] = content;
    } catch {
      generatedPages[page] = `<html><body style="background:#111;color:white;text-align:center;padding:50px;"><h1>${page} - Coming Soon</h1></body></html>`;
    }
  }

  return NextResponse.json({ success: true, action: "generate-pages", pages: generatedPages, pageCount: Object.keys(generatedPages).length });
}
