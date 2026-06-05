import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { action, niche } = await req.json();
    const GROQ_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: "GROQ_API_KEY not set in environment variables" 
      });
    }

    switch (action) {
      case "build-site":
        return await buildRealWebsite(niche, GROQ_KEY);
      case "generate-pages":
        return await generateAllPages(niche, GROQ_KEY);
      default:
        return NextResponse.json({ 
          success: false, 
          error: `Unknown action: ${action}` 
        });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function buildRealWebsite(niche: string, apiKey: string) {
  console.log("🔨 Building website for:", niche);
  
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 8000,
      messages: [
        {
          role: "system",
          content: `You are a FULL-STACK WEBSITE BUILDER AI. Generate COMPLETE, production-ready, single-file HTML website. Include ALL CSS and JavaScript inline. 

CRITICAL RULES:
1. Output ONLY the complete HTML code in a code block using \`\`\`html ... \`\`\`
2. Include all CSS in <style> tags
3. Include all JavaScript in <script> tags
4. Make it a complete multi-section landing page
5. Use modern design (glassmorphism, gradients, animations)
6. Mobile responsive
7. Include: Hero, Features, About, Services, Testimonials, Pricing, Contact, Footer sections
8. Add newsletter signup form
9. Add dark/light mode toggle button
10. Use only free CDN resources
11. Add scroll animations
12. Make it look premium and professional

Return ONLY the HTML code inside \`\`\`html ... \`\`\` tags. Nothing else.`
        },
        {
          role: "user",
          content: `Build a COMPLETE premium modern website for: "${niche}"

Requirements:
- Dark theme with neon/gradient accents
- Glassmorphism cards and sections
- Animated hero section with headline
- Smooth scroll navigation menu
- Mobile responsive design
- Contact form with basic validation
- Newsletter signup popup
- Testimonial section
- Pricing tables section
- Stats/numbers counter section
- AI chat widget (simple version)
- SEO meta tags
- Loading spinner animation
- Scroll to top button
- Cookie consent banner
- Font Awesome icons from CDN
- Google Fonts from CDN

Make it a COMPLETE, beautiful, production-ready website. Use real-looking content for ${niche}.`
        }
      ],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Groq API error:", res.status, errorText);
    return NextResponse.json({ 
      success: false, 
      error: `Groq API error: ${res.status} - ${errorText.slice(0, 200)}` 
    });
  }

  const responseData = await res.json();
  const content = responseData?.choices?.[0]?.message?.content || "";
  
  // Extract HTML from code block
  const htmlMatch = content.match(/```html\n?([\s\S]*?)```/);
  const htmlCode = htmlMatch ? htmlMatch[1] : content;

  console.log("✅ Website generated! Length:", htmlCode.length);

  return NextResponse.json({
    success: true,
    action: "build-site",
    website: htmlCode,
    niche,
    timestamp: new Date().toISOString()
  });
}

async function generateAllPages(niche: string, apiKey: string) {
  const pages = ["about", "services", "blog", "contact", "pricing", "faq"];
  const generatedPages: Record<string, string> = {};

  for (const page of pages) {
    try {
      console.log(`📄 Generating ${page} page...`);
      
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 4000,
          messages: [
            {
              role: "system",
              content: "Generate a complete HTML page with inline CSS/JS. Output ONLY the HTML code in ```html ``` blocks. Use dark theme, modern design, glassmorphism."
            },
            {
              role: "user",
              content: `Create the "${page}" page for a ${niche} website. Include navigation header, main content, and footer. Use modern dark theme design. Make it professional.`
            }
          ],
        }),
      });

      const responseData = await res.json();
      const content = responseData?.choices?.[0]?.message?.content || "";
      const htmlMatch = content.match(/```html\n?([\s\S]*?)```/);
      generatedPages[page] = htmlMatch ? htmlMatch[1] : content;
      
      console.log(`✅ ${page} page generated`);
    } catch (err) {
      console.error(`❌ Error generating ${page}:`, err);
      generatedPages[page] = `<html><body><h1>${page} - Coming Soon</h1></body></html>`;
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
