import { NextResponse } from "next/server";

const GROQ_KEY = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, niche, businessName, features } = await req.json();

    switch (action) {
      case "build-pro-site":
        return await buildProfessionalSite(niche, businessName, features);
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

async function buildProfessionalSite(niche: string, businessName?: string, features?: any) {
  const name = businessName || `${niche} Pro`;
  
  const prompt = `Create a COMPLETE PROFESSIONAL BUSINESS WEBSITE for: "${name}" in niche: "${niche}"

THIS MUST BE A REAL, DEPLOYABLE, PROFESSIONAL WEBSITE. Include ALL code inline.

REQUIREMENTS:

1. TECH STACK:
   - Pure HTML5, CSS3, JavaScript (no frameworks needed)
   - Tailwind CSS CDN for styling
   - Font Awesome 6 CDN for icons
   - Google Fonts (Inter + Poppins)
   - AOS (Animate on Scroll) library

2. PAGES (all in one file with smooth navigation):
   - HERO: Full-screen hero with headline, subheadline, CTA buttons, background gradient
   - FEATURES: 6 feature cards with icons, title, description
   - ABOUT: Company story, mission, team section with placeholder images
   - SERVICES: 4-6 service cards with pricing
   - TESTIMONIALS: Carousel with 4 testimonials (name, role, photo placeholder, quote)
   - PRICING: 3-tier pricing table (Basic, Pro, Enterprise)
   - FAQ: Accordion with 8 common questions
   - CONTACT: Working form (name, email, phone, message) with validation
   - FOOTER: Links, social media icons, newsletter signup, copyright

3. DESIGN:
   - Modern gradient backgrounds
   - Glassmorphism cards (backdrop-filter: blur)
   - Smooth scroll navigation
   - Sticky header with logo
   - Mobile hamburger menu
   - Dark/Light mode toggle
   - Loading screen animation
   - Scroll to top button
   - Hover animations on all cards
   - Professional color scheme (blue/indigo or green/teal)

4. FUNCTIONALITY:
   - Working navigation with active states
   - Mobile responsive (breakpoints at 768px, 1024px)
   - Contact form validation
   - Newsletter signup with email validation
   - FAQ accordion (click to expand/collapse)
   - Testimonial slider (auto-rotate)
   - Counter animation (animate numbers)
   - Smooth scroll to sections
   - Back to top button

5. SEO:
   - Meta title: "${name} - Professional ${niche} Services"
   - Meta description (155 chars)
   - Open Graph tags
   - Schema.org structured data
   - Semantic HTML5 tags
   - Alt text on all images
   - Canonical URL
   - Sitemap link

6. PERFORMANCE:
   - Lazy loading images
   - Minified CSS/JS inline
   - Optimized font loading
   - Preconnect to CDNs

7. CONVERSION:
   - CTA buttons throughout
   - Trust badges section
   - "As seen on" logos
   - Money-back guarantee badge
   - Live chat widget placeholder
   - Exit intent popup

8. BUSINESS FEATURES:
   - Phone number (clickable on mobile)
   - Email address
   - Business hours
   - Location/map placeholder
   - Book appointment button
   - Request quote form

MAKE IT LOOK LIKE A $10,000 PROFESSIONAL WEBSITE. Use real-looking content for ${niche}.
Return COMPLETE HTML starting with <!DOCTYPE html>. Include ALL CSS in <style> tags and ALL JS in <script> tags.`;

  const html = await callAI(prompt);
  
  // Clean up
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];
  
  const startIndex = Math.max(cleanHtml.indexOf("<!DOCTYPE"), cleanHtml.indexOf("<html"));
  if (startIndex > 0) cleanHtml = cleanHtml.slice(startIndex);

  return NextResponse.json({
    success: true,
    website: cleanHtml,
    niche,
    businessName: name,
    type: "professional",
    pages: ["Hero", "Features", "About", "Services", "Testimonials", "Pricing", "FAQ", "Contact", "Footer"],
    features: ["Mobile Responsive", "SEO Optimized", "Contact Form", "Blog Ready", "Analytics Ready", "Dark Mode", "Animations"],
  });
}

async function buildLandingPage(niche: string, businessName?: string) {
  const name = businessName || `${niche} Pro`;
  
  const prompt = `Create a HIGH-CONVERTING landing page for: "${name}" (${niche})

This is a SINGLE PAGE designed to CONVERT visitors into customers.

MUST INCLUDE:
1. Hero with strong headline, subheadline, CTA
2. Problem/Solution section
3. Benefits (6 bullet points with icons)
4. Social proof (testimonials, numbers, logos)
5. Lead magnet / Free offer
6. Urgency element (limited time, limited spots)
7. FAQ section
8. Final CTA
9. Footer

Design: Modern, clean, high-contrast CTA buttons.
Return complete HTML with inline CSS/JS.`;

  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];

  return NextResponse.json({ success: true, website: cleanHtml, type: "landing-page" });
}

async function buildBusinessSite(niche: string, businessName?: string) {
  const name = businessName || `${niche} Solutions`;
  
  const prompt = `Create a complete BUSINESS WEBSITE for: "${name}" (${niche})

Include: Home, About, Services, Portfolio/Case Studies, Team, Blog, Contact pages.
Professional corporate design. Return complete HTML.`;

  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];

  return NextResponse.json({ success: true, website: cleanHtml, type: "business" });
}

async function buildSaaSSite(niche: string, businessName?: string) {
  const name = businessName || `${niche} App`;
  
  const prompt = `Create a SAAS WEBSITE for: "${name}" (${niche})

Include: Hero with product demo mockup, Features grid, How it works (3 steps), Pricing (Monthly/Yearly toggle), Integrations, Testimonials, FAQ, CTA, Footer.
Modern SaaS design with gradients, rounded corners, app screenshots.`;

  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];

  return NextResponse.json({ success: true, website: cleanHtml, type: "saas" });
}

async function buildEcommerce(niche: string, businessName?: string) {
  const name = businessName || `${niche} Store`;
  
  const prompt = `Create an E-COMMERCE WEBSITE for: "${name}" (${niche})

Include: Product grid (8 products with images, prices, ratings), Shopping cart sidebar, Category filters, Search bar, Featured products slider, Newsletter, Footer.
Modern e-commerce design. Return complete HTML with inline CSS/JS.`;

  const html = await callAI(prompt);
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)```/);
  if (match) cleanHtml = match[1];

  return NextResponse.json({ success: true, website: cleanHtml, type: "ecommerce" });
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
      return data?.choices?.[0]?.message?.content || "";
    } catch {}
  }
  if (GEMINI_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 8000 } }) }
      );
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch {}
  }
  return "AI unavailable";
}
