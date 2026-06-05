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

// ========== STRATEGY FUNCTIONS ==========

async function genesisCreation(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 4000,
        messages: [
          { role: "system", content: `Create a complete website empire blueprint for: ${niche}. Include: brand name, domain ideas, 15+ pages, 50 article titles, SEO keywords, monetization plan, design specs, revenue projections. Return as structured text.` },
          { role: "user", content: `Build complete blueprint for ${niche} website` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "genesis", blueprint: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function selfEvolution(niche: string, stage: number, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 3000,
        messages: [
          { role: "system", content: `Provide evolution plan stage ${(stage || 0) + 1}/5 for ${niche} website. Include: new features, content upgrades, monetization improvements, traffic tactics, design evolution.` },
          { role: "user", content: `Evolve my ${niche} website` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "evolve", evolution: data?.choices?.[0]?.message?.content, stage: (stage || 0) + 1, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function neuralMonetization(niche: string, method: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 3000,
        messages: [
          { role: "system", content: `Create monetization strategy for ${niche}. Include: AdSense optimization, affiliate programs, digital products, services, newsletter, sponsorship. Give estimated revenue ranges at different traffic levels.` },
          { role: "user", content: `Monetize my ${niche} website` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "monetize", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function quantumTraffic(niche: string, target: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 3000,
        messages: [
          { role: "system", content: `Create traffic strategy to reach ${target || "100K"} visitors/month for ${niche}. Include: SEO, social media, content marketing, backlinks, paid ads, community building, growth hacks. Give timeline.` },
          { role: "user", content: `Get ${target || "100K"} visitors for ${niche}` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "traffic", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function predictiveSEO(niche: string, competitors: string, apiKey: string) {
  try {
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
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function autonomousContent(niche: string, apiKey: string) {
  try {
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
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function neuralDesign(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 3000,
        messages: [
          { role: "system", content: `Create design specification for ${niche} website. Include: color palette (hex codes), typography (Google Fonts), layout structure, component ideas, animation suggestions, UI elements. Dark theme, modern, glassmorphism style.` },
          { role: "user", content: `Design for ${niche}` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "design", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function neuralAds(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 3000,
        messages: [
          { role: "system", content: `Create ad revenue strategy for ${niche}. Include: AdSense placement map, ad networks to join, direct ad sales pricing, sponsored content rates, affiliate integration. Give estimated revenue at 10K/50K/100K visitors/month.` },
          { role: "user", content: `Ad strategy for ${niche}` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "ads", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function empireExpansion(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 3000,
        messages: [
          { role: "system", content: `Create empire expansion plan from ${niche}. Include: 10 related niches to expand into, interlinking strategy between sites, shared resources, cross-promotion tactics, 5-year growth projection with revenue estimates.` },
          { role: "user", content: `Expand empire from ${niche}` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "empire", plan: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function deepAnalysis(domain: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 3000,
        messages: [
          { role: "system", content: `Analyze website: ${domain || "the provided website"}. Provide: SEO audit, monetization audit, content audit, traffic estimation, competitor analysis, improvement roadmap with timeline. Give overall score out of 100.` },
          { role: "user", content: `Analyze ${domain || "my website"}` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "analyze", analysis: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

async function competitorClone(competitors: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", max_tokens: 3000,
        messages: [
          { role: "system", content: `Analyze competitors: ${competitors || "top sites in the niche"}. Provide: reverse engineering of their strategy, content gaps, superior strategy to beat them, execution plan week by week for 3 months.` },
          { role: "user", content: `Clone and beat competitors` }
        ],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, action: "clone", strategy: data?.choices?.[0]?.message?.content, timestamp: new Date().toISOString() });
  } catch (err) { return NextResponse.json({ success: false, error: String(err) }); }
}

// ========== BUILDER FUNCTIONS ==========

async function buildRealWebsite(niche: string, apiKey: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 8000,
        messages: [
          {
            role: "system",
            content: `You are a website builder. Generate a COMPLETE single-file HTML website. Include ALL CSS in <style> tags and ALL JavaScript in <script> tags. Make it beautiful with modern design.

CRITICAL: Return the RAW HTML directly. Start with <!DOCTYPE html> and end with </html>. Do NOT wrap in markdown code blocks. Just return the HTML.`
          },
          {
            role: "user",
            content: `Create a complete modern website for: "${niche}"

Requirements:
- Dark theme with neon green (#00ff88) and blue (#00aaff) accents
- Glassmorphism cards and sections
- Hero section with headline, subheadline, and CTA button
- Features section (4 features with icons)
- About section
- Services section (3 services)
- Testimonials section (3 testimonials)
- Pricing section (3 tiers: Basic, Pro, Enterprise)
- Contact form with name, email, message fields
- Footer with links and social icons
- Newsletter signup form
- Mobile responsive design
- Smooth scroll navigation menu
- Scroll animations (fade in)
- Loading spinner on page load
- Back to top button
- Use Font Awesome CDN for icons: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
- Use Google Fonts Inter: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap
- Realistic content and text for ${niche}
- Professional and production-ready

Make it a COMPLETE beautiful website.`
          }
        ],
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json({ success: false, error: `Groq API error ${res.status}: ${errorBody.slice(0, 200)}` });
    }

    const responseData = await res.json();
    let htmlCode = responseData?.choices?.[0]?.message?.content || "";

    if (!htmlCode) {
      return NextResponse.json({ success: false, error: "Empty response from AI" });
    }

    // Clean up markdown wrappers if AI added them
    const htmlMatch = htmlCode.match(/```html\n?([\s\S]*?)```/);
    if (htmlMatch) htmlCode = htmlMatch[1];

    // Remove any text before <!DOCTYPE or <html
    const doctypeIndex = htmlCode.indexOf("<!DOCTYPE");
    const htmlIndex = htmlCode.indexOf("<html");
    const startIndex = doctypeIndex !== -1 ? doctypeIndex : htmlIndex;
    if (startIndex > 0) htmlCode = htmlCode.slice(startIndex);

    return NextResponse.json({
      success: true,
      action: "build-site",
      website: htmlCode,
      niche,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
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
            { role: "system", content: "Generate a complete HTML page. Return RAW HTML starting with <!DOCTYPE html>. Do NOT wrap in markdown. Include inline CSS for dark modern theme." },
            { role: "user", content: `Create the "${page}" page for a ${niche} website. Dark modern theme, professional. Include navigation and footer.` }
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

  return NextResponse.json({
    success: true,
    action: "generate-pages",
    pages: generatedPages,
    pageCount: Object.keys(generatedPages).length,
    timestamp: new Date().toISOString()
  });
}
