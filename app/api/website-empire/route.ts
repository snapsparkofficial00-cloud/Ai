import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { action, niche, domain, monetization, target, competitors, evolutionStage, data } = await req.json();

    switch (action) {
      case "genesis": return await smartAI(niche, `Create website empire blueprint for: ${niche}. Brand name, domain ideas, 15+ pages, 50 article titles, SEO keywords, monetization plan, design specs, revenue projections.`, "genesis");
      case "evolve": return await smartAI(niche, `Evolution plan stage ${(evolutionStage||0)+1}/5 for ${niche} website. New features, content upgrades, monetization improvements, traffic tactics.`, "evolve");
      case "monetize": return await smartAI(niche, `Monetization strategy for ${niche}: AdSense optimization, affiliate programs, digital products, services, newsletter, sponsorship. Revenue estimates at different traffic levels.`, "monetize");
      case "traffic": return await smartAI(niche, `Traffic strategy for ${target||"100K"} visitors/month for ${niche}: SEO, social media, content marketing, backlinks, paid ads, community building, growth hacks. Timeline included.`, "traffic");
      case "seo": return await smartAI(niche, `SEO strategy for ${niche}: keyword strategy, content clusters, technical SEO, backlink strategy, E-E-A-T optimization. Competitors: ${competitors||"top sites"}.`, "seo");
      case "content": return await smartAI(niche, `30-day content calendar for ${niche}. For each article: viral title, meta description, target keywords, content outline, intro hook. Include pillar strategy.`, "content");
      case "design": return await smartAI(niche, `Design specification for ${niche}: color palette (hex codes), typography (Google Fonts), layout, components, animations. Dark theme, glassmorphism, modern.`, "design");
      case "ads": return await smartAI(niche, `Ad revenue strategy for ${niche}: AdSense placement, ad networks, direct sales pricing, sponsored content rates. Revenue at 10K/50K/100K visitors.`, "ads");
      case "empire": return await smartAI(niche, `Empire expansion from ${niche}: 10 related niches, interlinking strategy, cross-promotion, 5-year growth projection with revenue estimates.`, "empire");
      case "analyze": return await smartAI(niche, `Analyze ${domain||"website"}: SEO audit, monetization audit, content audit, traffic estimation, competitor analysis, roadmap. Score/100.`, "analyze");
      case "clone": return await smartAI(niche, `Analyze competitors: ${competitors||"top sites"}. Reverse engineer strategy, content gaps, superior strategy, week-by-week execution plan.`, "clone");
      case "build-site": return await buildRealWebsite(niche);
      case "generate-pages": return await generateAllPages(niche);
      default: return NextResponse.json({ success: false, error: `Unknown action: ${action}` });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== SMART AI ROUTER ==========
// Tries all 4 APIs in order: Gemini → OpenRouter → Groq → HuggingFace

async function smartAI(niche: string, prompt: string, action: string) {
  const result = await tryAllAPIs(prompt, 4000);
  
  if (result.success) {
    return NextResponse.json({ 
      success: true, 
      action, 
      result: result.text, 
      model: result.model 
    });
  }
  
  return NextResponse.json({ success: false, error: "All AI APIs exhausted. Try again later." });
}

async function buildRealWebsite(niche: string) {
  const prompt = `Create a COMPLETE single-file HTML website for: "${niche}".

Requirements:
- Dark theme with neon green (#00ff88) and blue (#00aaff) accents
- Glassmorphism cards and sections
- Hero section with headline, subheadline, CTA button
- Features section (4 features with Font Awesome icons)
- About section
- Services section (3 services)
- Testimonials section (3 testimonials)
- Pricing section (3 tiers: Basic $9, Pro $29, Enterprise $99)
- Contact form (name, email, message)
- Footer with links and newsletter signup
- Mobile responsive
- Smooth scroll navigation
- Scroll fade-in animations
- Back to top button
- Font Awesome CDN: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
- Google Fonts Inter: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap
- Loading spinner
- Realistic content for ${niche}

Return COMPLETE HTML starting with <!DOCTYPE html>. Include ALL CSS in <style> tags and ALL JS in <script> tags. Do NOT wrap in markdown. Just return the raw HTML.`;

  const result = await tryAllAPIs(prompt, 8000);
  
  if (!result.success) {
    return NextResponse.json({ success: false, error: "All AI APIs exhausted" });
  }

  let htmlCode = result.text;
  
  // Clean up
  const htmlMatch = htmlCode.match(/```html\n?([\s\S]*?)```/);
  if (htmlMatch) htmlCode = htmlMatch[1];
  
  const doctypeIndex = htmlCode.indexOf("<!DOCTYPE");
  const htmlIndex = htmlCode.indexOf("<html");
  const startIndex = doctypeIndex !== -1 ? doctypeIndex : htmlIndex;
  if (startIndex > 0) htmlCode = htmlCode.slice(startIndex);

  return NextResponse.json({ 
    success: true, 
    action: "build-site", 
    website: htmlCode, 
    niche,
    model: result.model
  });
}

async function generateAllPages(niche: string) {
  const pages = ["about", "services", "blog", "contact", "pricing", "faq"];
  const generatedPages: Record<string, string> = {};

  for (const page of pages) {
    const prompt = `Create "${page}" HTML page for ${niche} website. Dark modern theme with green/blue accents. Include navigation header and footer. Return complete HTML starting with <!DOCTYPE html>. Do NOT wrap in markdown.`;
    
    const result = await tryAllAPIs(prompt, 4000);
    let content = result.text || "";
    
    const htmlMatch = content.match(/```html\n?([\s\S]*?)```/);
    if (htmlMatch) content = htmlMatch[1];
    
    generatedPages[page] = content || `<html><body style="background:#111;color:white;text-align:center;padding:50px;font-family:sans-serif;"><h1>${page}</h1><p>Coming Soon</p></body></html>`;
  }

  return NextResponse.json({ 
    success: true, 
    action: "generate-pages", 
    pages: generatedPages, 
    pageCount: Object.keys(generatedPages).length 
  });
}

// ========== MULTI-API ENGINE ==========

async function tryAllAPIs(prompt: string, maxTokens: number) {
  // 1. Try Gemini (BEST free tier)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    const result = await callGemini(prompt, geminiKey, maxTokens);
    if (result) return { success: true, text: result, model: "gemini" };
  }

  // 2. Try OpenRouter
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    const result = await callOpenRouter(prompt, openRouterKey, maxTokens);
    if (result) return { success: true, text: result, model: "openrouter" };
  }

  // 3. Try Groq
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    const result = await callGroq(prompt, groqKey, maxTokens);
    if (result) return { success: true, text: result, model: "groq" };
  }

  // 4. Try HuggingFace
  const hfKey = process.env.HUGGINGFACE_API_KEY;
  if (hfKey) {
    const result = await callHuggingFace(prompt, hfKey);
    if (result) return { success: true, text: result, model: "huggingface" };
  }

  return { success: false, text: "" };
}

// Gemini API
async function callGemini(prompt: string, apiKey: string, maxTokens: number) {
  try {
    const model = maxTokens > 4000 ? "gemini-1.5-flash" : "gemini-1.5-flash";
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch {
    return null;
  }
}

// OpenRouter API
async function callOpenRouter(prompt: string, apiKey: string, maxTokens: number) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://ai-ivory-delta.vercel.app",
        "X-Title": "AI OS Website Empire",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

// Groq API
async function callGroq(prompt: string, apiKey: string, maxTokens: number) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

// HuggingFace API
async function callHuggingFace(prompt: string, apiKey: string) {
  try {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${prompt} [/INST]`,
          parameters: { max_new_tokens: 2000, temperature: 0.7 },
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0]?.generated_text?.split("[/INST]")?.pop()?.trim() || null;
  } catch {
    return null;
  }
}
