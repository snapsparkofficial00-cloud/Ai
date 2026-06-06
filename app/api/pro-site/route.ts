import { NextResponse } from "next/server";

const GROQ_KEY = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, niche, businessName } = await req.json();

    switch (action) {
      case "build-pro-site":
        return await buildProfessionalSite(niche, businessName);
      case "build-landing-page":
        return await buildLandingPage(niche, businessName);
      case "build-business-site":
        return await buildBusinessSite(niche, businessName);
      case "build-saas-site":
        return await buildSaaSSite(niche, businessName);
      case "build-ecommerce":
        return await buildEcommerce(niche, businessName);
      default:
        return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function buildProfessionalSite(niche: string, businessName?: string) {
  const name = businessName || `${niche} Pro`;
  
  const prompt = `Create a PROFESSIONAL BUSINESS WEBSITE for: "${name}" (${niche}).

Include: Hero, Features (6), About, Services (4), Testimonials, Pricing (3 tiers), FAQ (8), Contact form, Footer.
Use: HTML5, CSS3, JS. Tailwind CDN, Font Awesome CDN, Google Fonts.
Design: Modern, gradients, glassmorphism, mobile responsive, dark/light mode, animations.
Return COMPLETE HTML starting with <!DOCTYPE html>. Include CSS in <style> and JS in <script>.`;

  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];
  const startIndex = Math.max(cleanHtml.indexOf("<!DOCTYPE"), cleanHtml.indexOf("<html"));
  if (startIndex > 0) cleanHtml = cleanHtml.slice(startIndex);

  return NextResponse.json({
    success: true,
    website: cleanHtml || html,
    niche,
    businessName: name,
    type: "professional",
    size: (cleanHtml || html).length,
  });
}

async function buildLandingPage(niche: string, businessName?: string) {
  const name = businessName || `${niche} Pro`;
  const prompt = `Create a HIGH-CONVERTING landing page for: "${name}" (${niche}). Hero, benefits, social proof, CTA, FAQ. Modern design. Return complete HTML.`;
  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];
  return NextResponse.json({ success: true, website: cleanHtml || html, type: "landing-page", size: (cleanHtml || html).length });
}

async function buildBusinessSite(niche: string, businessName?: string) {
  const name = businessName || `${niche} Solutions`;
  const prompt = `Create a BUSINESS WEBSITE for: "${name}" (${niche}). Home, About, Services, Portfolio, Team, Blog, Contact. Professional design. Return complete HTML.`;
  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];
  return NextResponse.json({ success: true, website: cleanHtml || html, type: "business", size: (cleanHtml || html).length });
}

async function buildSaaSSite(niche: string, businessName?: string) {
  const name = businessName || `${niche} App`;
  const prompt = `Create a SAAS WEBSITE for: "${name}" (${niche}). Hero with mockup, Features, How it works, Pricing toggle, Integrations, Testimonials, FAQ. Modern SaaS design. Return complete HTML.`;
  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];
  return NextResponse.json({ success: true, website: cleanHtml || html, type: "saas", size: (cleanHtml || html).length });
}

async function buildEcommerce(niche: string, businessName?: string) {
  const name = businessName || `${niche} Store`;
  const prompt = `Create an E-COMMERCE WEBSITE for: "${name}" (${niche}). Product grid (8 items), Cart sidebar, Filters, Search, Featured slider, Newsletter. Modern design. Return complete HTML.`;
  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];
  return NextResponse.json({ success: true, website: cleanHtml || html, type: "ecommerce", size: (cleanHtml || html).length });
}

async function callAI(prompt: string): Promise<string> {
  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 8000, temperature: 0.7, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text && text.length > 50) return text;
    } catch {}
  }
  if (GEMINI_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 8000 } }) }
      );
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.length > 50) return text;
    } catch {}
  }
  return "";
}
