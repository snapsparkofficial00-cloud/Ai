import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    const prompt = `Create the ULTIMATE FREE AI TOOLS website - a directory of ALL latest AI tools with free access.

THIS IS A COMPLETE AI TOOLS PORTAL where users can discover, access, and use AI tools for FREE. Make it look like a premium tech platform.

INCLUDE ALL THESE AI TOOLS & CATEGORIES:

1. 🤖 LATEST AI CHAT MODELS (FREE ACCESS):
   - Claude 3.5 Sonnet / Claude 4 (Anthropic) - "Most powerful AI"
   - ChatGPT 4o / GPT-5 (OpenAI) - "Latest ChatGPT"
   - Google Gemini 2.0 - "Google's best AI"
   - Grok 2 (xAI/Elon Musk) - "Real-time AI"
   - DeepSeek V3 - "Chinese ChatGPT killer"
   - Meta Llama 3.3 - "Open source best"
   - Mistral Large - "European AI leader"
   - Perplexity AI Pro - "AI search engine"
   - Pi AI - "Emotional AI companion"
   - Character AI - "Chat with anyone"
   - Each with: "Try Free" button, features list, rating

2. 🎨 AI IMAGE GENERATORS (FREE):
   - Midjourney V7 - "Best AI art"
   - DALL-E 4 - "OpenAI image gen"
   - Stable Diffusion 3 - "Open source"
   - Leonardo AI - "Game assets"
   - Playground AI - "Unlimited free"
   - Ideogram 2.0 - "Text in images"
   - Flux AI - "Hyper-realistic"
   - Adobe Firefly - "Adobe's AI"
   - Canva AI - "Design with AI"
   - Bing Image Creator - "Microsoft free"
   - Each with sample images, features, free tier info

3. 🎥 AI VIDEO GENERATORS (FREE TRIAL):
   - Sora AI (OpenAI) - "Text to video"
   - Runway Gen-3 - "Professional AI video"
   - Pika 2.0 - "Anime style video"
   - Kling AI - "Chinese video AI"
   - Haiper AI - "Free video gen"
   - InVideo AI - "YouTube videos"
   - HeyGen - "AI avatars"
   - Synthesia - "AI presenters"
   - CapCut AI - "TikTok/Reels AI"
   - Filmora AI - "AI editing"

4. 🎵 AI MUSIC & AUDIO (FREE):
   - Suno AI V4 - "Create songs"
   - Udio AI - "Music generator"
   - ElevenLabs - "Best AI voice"
   - Murf AI - "Text to speech"
   - PlayHT - "Voice cloning"
   - Mubert - "Royalty-free music"
   - Soundraw - "AI beat maker"
   - AIVA - "AI composer"
   - Beatoven - "Background music"
   - Lovo AI - "Voiceover"

5. ✍️ AI WRITING TOOLS (FREE):
   - Jasper AI - "Best AI writer"
   - Copy.ai - "Marketing copy"
   - Writesonic - "SEO content"
   - Rytr - "Budget AI writer"
   - Claude AI - "Long form writing"
   - Notion AI - "Notes + AI"
   - Grammarly AI - "Writing assistant"
   - Quillbot - "Paraphrasing"
   - Hemingway AI - "Readability"
   - Wordtune - "Rewrite sentences"

6. 💻 AI CODING TOOLS (FREE):
   - GitHub Copilot - "Best code AI"
   - Cursor AI - "AI code editor"
   - Replit AI - "Online coding"
   - Bolt.new - "Build apps with AI"
   - v0 by Vercel - "UI generation"
   - Lovable - "AI app builder"
   - Claude Engineer - "Auto coding"
   - Devin AI - "AI software engineer"
   - Codeium - "Free copilot"
   - Tabnine - "AI autocomplete"

7. 🎯 AI PRODUCTIVITY TOOLS:
   - Notion AI - "Smart workspace"
   - Mem AI - "Self-organizing notes"
   - Otter AI - "Meeting transcription"
   - Fireflies AI - "Call notes"
   - Tome AI - "AI presentations"
   - Gamma AI - "Beautiful docs"
   - Beautiful AI - "Slide decks"
   - Slides AI - "Google Slides AI"
   - Taskade AI - "AI task manager"
   - Motion AI - "AI calendar"

8. 🖼️ AI DESIGN TOOLS:
   - Canva AI Suite - "Design everything"
   - Figma AI - "UI/UX design"
   - Uizard - "Screenshot to design"
   - Galileo AI - "Text to UI"
   - Microsoft Designer - "Free design"
   - Clipdrop - "AI photo editing"
   - Remove.bg - "Remove background"
   - Vectorizer - "Image to vector"
   - AutoDraw - "Google drawing AI"
   - Khroma - "AI color palettes"

9. 🔍 AI SEARCH & RESEARCH:
   - Perplexity Pro - "AI search"
   - You.com - "AI search engine"
   - Phind - "Developer search"
   - Elicit - "Research papers"
   - Consensus - "Scientific AI"
   - Semantic Scholar - "Academic AI"
   - ChatPDF - "Chat with PDFs"
   - Humata - "Document AI"
   - SciSpace - "Paper analysis"
   - ExplainPaper - "Paper explainer"

10. 🎮 AI FUN & CREATIVE:
    - Reface AI - "Face swap"
    - Lensa AI - "Magic avatars"
    - Wonder Dynamics - "CGI characters"
    - Kaiber AI - "Music videos"
    - Decoherence - "Trippy AI art"
    - Pika Labs - "Anime creation"
    - Genmo AI - "Creative tools"
    - Neural Frames - "AI animations"
    - LeiaPix - "3D photos"
    - CapCut Templates - "Viral templates"

11. 📱 WEBSITE FEATURES:
    - Search bar: "Search 100+ AI tools..."
    - Category tabs: All | Chat | Image | Video | Music | Writing | Code | Design
    - Trending: "🔥 Trending AI Tools This Week"
    - New: "🆕 Just Launched"
    - Free: "🆓 100% Free Tools"
    - "Tool of the Day" featured section
    - Comparison tool: "ChatGPT vs Claude vs Gemini"
    - Newsletter: "Get weekly AI updates"
    - Submit AI tool form
    - Bookmark favorite tools (localStorage)
    - Upvote/downvote tools
    - User reviews & ratings

12. 🎨 DESIGN:
    - Futuristic cyberpunk dark theme
    - Neon gradients (purple, blue, cyan)
    - Glassmorphism cards
    - Particle background
    - Glowing border effects
    - Smooth animations
    - Tool cards with hover 3D effect
    - Font Awesome CDN
    - Google Fonts Inter + Space Grotesk
    - Mobile responsive
    - Dark/Light mode

13. 💰 MONETIZATION:
    - AdSense ads
    - Affiliate: AI tool subscriptions
    - "Pro" comparison table with affiliate links
    - Newsletter ad space
    - Sponsored tool placements
    - "Best AI tools for business" paid list

14. 🔍 SEO:
    - "100+ Best Free AI Tools 2024-2025"
    - "ChatGPT Alternatives Free"
    - "Best AI Image Generators 2025"
    - "Free AI Video Tools"
    - Each category has dedicated SEO section

Make EVERYTHING interactive. Return COMPLETE HTML starting with <!DOCTYPE html>. Include ALL CSS and JS inline. Do NOT wrap in markdown. Make it MASSIVE.`;

    let htmlCode = "";

    if (GEMINI_KEY) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { maxOutputTokens: 8192, temperature: 0.9 },
            }),
          }
        );
        const data = await res.json();
        htmlCode = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } catch {}
    }

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

    const htmlMatch = htmlCode.match(/```html\n?([\s\S]*?)```/);
    if (htmlMatch) htmlCode = htmlMatch[1];
    const startIndex = Math.max(htmlCode.indexOf("<!DOCTYPE"), htmlCode.indexOf("<html"));
    if (startIndex > 0) htmlCode = htmlCode.slice(startIndex);

    return NextResponse.json({ 
      success: true, 
      website: htmlCode, 
      niche,
      type: "ai-tools-hub",
      includes: ["Chat AI", "Image AI", "Video AI", "Music AI", "Writing AI", "Coding AI", "Design AI", "100+ Tools"]
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
