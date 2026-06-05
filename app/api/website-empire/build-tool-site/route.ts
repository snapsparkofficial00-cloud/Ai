import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    const prompt = `Create a COMPLETE tool-rich premium website for: "${niche}".

THIS WEBSITE MUST INCLUDE ALL THESE INTERACTIVE TOOLS AND FEATURES:

1. 🧮 INTERACTIVE CALCULATORS (at least 3 relevant calculators)
   - Build with JavaScript
   - Real-time calculation
   - Beautiful styled output
   - Example: ROI Calculator, Savings Calculator, BMI Calculator, Loan EMI, Tax Calculator

2. 🎮 INTERACTIVE GAMES/QUIZZES (at least 2)
   - JavaScript games
   - Quiz with score
   - Spin wheel for deals
   - Trivia game
   - Make them FUN and ADDICTIVE

3. 🛠️ UTILITY TOOLS (at least 3)
   - QR Code Generator
   - Password Generator
   - Word Counter
   - Color Picker
   - Meme Generator
   - Image to Base64 Converter

4. 📊 LIVE DATA & WIDGETS
   - Live clock
   - Weather widget (use free API or mock)
   - Crypto price ticker (mock with realistic data)
   - Stock market ticker
   - Currency converter
   - Countdown timer

5. 🤖 AI-POWERED FEATURES
   - AI Content Generator (simple version with prompt input)
   - AI Title Generator
   - AI Hashtag Generator
   - Text Summarizer
   - Grammar Checker

6. 📝 CONTENT TOOLS
   - Blog idea generator
   - Headline analyzer
   - Keyword density checker
   - Readability score
   - Word counter with stats

7. 🎨 CREATIVE TOOLS
   - Gradient Generator
   - Box Shadow Generator
   - CSS Button Generator
   - Color Palette Generator
   - Font Pairing suggestions

8. 💰 MONETIZATION
   - Google AdSense ad slots between tools
   - "Pro Version" upgrade buttons
   - Affiliate product cards related to tools
   - Email capture before showing results ("Enter email to see full results")
   - Sponsored tool placements

9. 🎯 USER ENGAGEMENT
   - Achievement badges for using tools
   - Share results on social media buttons
   - "Save your results" with email
   - Daily challenge/streak counter
   - Leaderboard (mock data)

10. 📱 DESIGN
    - Dark theme with neon accents
    - Glassmorphism cards
    - Mobile responsive
    - Smooth animations
    - Font Awesome icons
    - Google Fonts Inter
    - Particle background
    - Loading spinners
    - Toast notifications
    - Tab navigation between tools

11. 🔍 SEO & SHARING
    - Each tool has its own meta tags
    - Schema.org markup for tools
    - Social share buttons
    - "Embed this tool" code
    - Print-friendly results
    - Copy to clipboard buttons

12. 📊 DASHBOARD FEATURES
    - User stats (localStorage)
    - Recently used tools
    - Favorite tools bookmark
    - Search tools bar
    - Tool categories sidebar

Make EVERY tool FULLY FUNCTIONAL with JavaScript. Use localStorage to save user data. Include REAL working calculations and algorithms.

Return COMPLETE HTML starting with <!DOCTYPE html>. Include ALL CSS in <style> tags and ALL JS in <script> tags. Do NOT wrap in markdown. Make it a MASSIVE, fully functional website.`;

    let htmlCode = "";
    
    // Try Gemini first
    if (GEMINI_KEY) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { maxOutputTokens: 8192, temperature: 0.8 },
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

    return NextResponse.json({ 
      success: true, 
      website: htmlCode, 
      niche,
      features: ["Calculators", "Games", "Tools", "AI Features", "Live Widgets", "Dashboard", "SEO"]
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
