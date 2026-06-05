import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    const prompt = `Create a COMPLETE money-making website for: "${niche}".

THIS WEBSITE MUST INCLUDE ALL MONETIZATION FEATURES:

1. GOOGLE ADSENSE INTEGRATION
   - Ad placeholder slots in optimal positions (header, sidebar, in-content, footer)
   - Ad script with placeholder: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
   - Responsive ad units

2. AFFILIATE MARKETING
   - Product recommendation sections with affiliate links (use placeholder links)
   - "Best Products" comparison table
   - Review sections with star ratings
   - CTA buttons for affiliate products

3. EMAIL CAPTURE
   - Newsletter popup (appears after 5 seconds)
   - Email signup form in hero section
   - Lead magnet offer ("Free Guide", "Free Checklist", "Free Course")
   - Exit-intent popup

4. SEO OPTIMIZATION
   - Meta title, description, keywords
   - Schema.org structured data (JSON-LD)
   - Open Graph tags for social sharing
   - Twitter Cards
   - H1, H2, H3 proper structure
   - Internal linking between pages
   - Breadcrumb navigation
   - Sitemap link

5. SOCIAL MEDIA
   - Share buttons on every article (Facebook, Twitter, LinkedIn, WhatsApp)
   - Social media follow buttons
   - Click-to-tweet boxes
   - Pinterest-optimized images

6. ANALYTICS
   - Google Analytics script placeholder
   - Facebook Pixel placeholder
   - Hotjar placeholder

7. CONTENT SECTIONS
   - Blog section with 6 article cards
   - "Latest News" section
   - "Trending Now" section
   - Related posts section
   - Author bio box
   - Comments section

8. TRUST SIGNALS
   - Trust badges (SSL, Money-back guarantee)
   - Social proof counters ("X subscribers", "X customers")
   - Testimonials with photos
   - "As Seen On" logos
   - Star ratings

9. MONETIZATION ELEMENTS
   - Sponsored content disclosure
   - "How We Make Money" page link
   - Premium content teaser
   - "Deals" page with affiliate offers

10. DESIGN
    - Dark theme with neon accents (#00ff88, #00aaff)
    - Glassmorphism cards
    - Mobile responsive
    - Fast loading (optimized CSS)
    - Font Awesome CDN
    - Google Fonts Inter

Make it a COMPLETE, production-ready, money-making website. Return RAW HTML starting with <!DOCTYPE html>. Include ALL CSS in <style> tags and ALL JS in <script> tags. Do NOT wrap in markdown.`;

    let htmlCode = "";
    
    // Try Gemini first (best for long content)
    if (GEMINI_KEY) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { maxOutputTokens: 8192, temperature: 0.7 },
            }),
          }
        );
        const data = await res.json();
        htmlCode = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } catch {}
    }

    // Fallback to Groq
    if (!htmlCode && GROQ_KEY) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
          body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 8000, messages: [{ role: "user", content: prompt }] }),
        });
        const data = await res.json();
        htmlCode = data?.choices?.[0]?.message?.content || "";
      } catch {}
    }

    if (!htmlCode) {
      return NextResponse.json({ success: false, error: "No AI API available" });
    }

    // Clean up
    const htmlMatch = htmlCode.match(/```html\n?([\s\S]*?)```/);
    if (htmlMatch) htmlCode = htmlMatch[1];
    const startIndex = Math.max(htmlCode.indexOf("<!DOCTYPE"), htmlCode.indexOf("<html"));
    if (startIndex > 0) htmlCode = htmlCode.slice(startIndex);

    return NextResponse.json({ success: true, website: htmlCode, niche, features: ["AdSense", "Affiliate", "Email Capture", "SEO", "Social", "Analytics", "Trust Signals"] });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
