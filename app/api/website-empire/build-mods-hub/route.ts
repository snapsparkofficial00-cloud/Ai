import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    const prompt = `Create the ULTIMATE MODS & HACKS HUB website for: "${niche}".

THIS IS A MASSIVE DOWNLOAD PORTAL for ALL popular modded apps and games. Make it look PROFESSIONAL and TRUSTWORTHY.

INCLUDE ALL THESE SECTIONS:

1. 🎮 GAME MODS SECTION:
   - GTA 5 Mod Menu (latest version)
   - GTA San Andreas Mod APK
   - Clash of Clans (COC) Private Server + Mod
   - Clash Royale Mod APK (unlimited gems)
   - Free Fire Mod APK (aimbot, unlimited diamonds)
   - Free Fire MAX Mod APK
   - BGMI Mod APK (ESP hack, aimbot, no recoil)
   - BGMI Config File Download
   - Minecraft Mod APK (god mode, unlimited items)
   - PUBG Mobile Mod APK
   - Call of Duty Mobile Mod APK
   - Asphalt 9 Mod APK (unlimited credits)
   - FIFA Mobile Mod APK
   - Candy Crush Mod APK (unlimited lives)
   - Subway Surfers Mod APK (unlimited coins)
   - Temple Run Mod APK
   - Hill Climb Racing Mod APK

2. 📱 WHATSAPP MODS SECTION:
   - GB WhatsApp Latest Version
   - WhatsApp Plus (OGWhatsApp)
   - FM WhatsApp
   - YoWhatsApp
   - WhatsApp Aero
   - JTWhatsApp
   - WhatsApp Transparent Mod
   - Features: Hide blue ticks, anti-delete, themes, auto-reply
   - Comparison table: Which WhatsApp mod is best?
   - Installation guide with screenshots

3. 📸 INSTAGRAM MODS SECTION:
   - InstaPro (Instagram Mod)
   - InstaMod
   - Instagram Plus
   - OGInstagram
   - Features: Download reels, hide view status, ad-free
   - Instagram Followers Booster APK

4. 🎬 STREAMING MODS SECTION:
   - YouTube Vanced / ReVanced
   - YouTube Premium Mod APK (no ads, background play)
   - Spotify Premium Mod APK
   - Netflix Mod APK
   - Amazon Prime Video Mod
   - Hotstar Mod APK
   - Zee5 Mod APK
   - JioCinema Mod APK
   - Thoptv / HD Streamz (live TV)
   - PikaShow (movies + live sports)

5. 🛠️ UTILITY MODS SECTION:
   - Lucky Patcher (root + no root)
   - Game Guardian
   - ES File Explorer Pro Mod
   - MX Player Pro Mod
   - Kinemaster Mod APK (no watermark)
   - CapCut Mod APK (premium unlocked)
   - PicsArt Mod APK
   - Lightroom Mod APK
   - Alight Motion Mod APK

6. 🔒 VPN & SECURITY MODS:
   - ExpressVPN Mod APK
   - NordVPN Mod APK
   - TurboVPN Mod APK
   - SecureVPN Mod APK
   - Psiphon Pro Mod

7. 📊 EACH APP/GAME CARD MUST HAVE:
   - App icon (use placeholder)
   - App name + version
   - File size
   - Android version required
   - MOD features list (bulleted)
   - "Download" button (big, colorful)
   - "How to Install" collapsible guide
   - Screenshots gallery
   - User rating stars
   - "Report broken link" button
   - Last updated date

8. 🎯 INTERACTIVE FEATURES:
   - Search bar (search any mod)
   - Category filter tabs
   - "Most Downloaded" section
   - "Newly Added" section
   - "Trending Now" section
   - Request a Mod form
   - Telegram channel link ("Join for instant updates")
   - WhatsApp group link
   - Push notification bell (mock)
   - Bookmark favorite mods (localStorage)
   - Download counter (mock numbers)

9. 💰 MONETIZATION:
   - AdSense ads between download buttons
   - "Download will start in 10 seconds..." (show ad)
   - "Complete 1 task to unlock download" (mock gamification)
   - Affiliate: "Need hosting? Try Hostinger"
   - Sponsored: "Best gaming phone 2024"
   - Telegram premium channel promotion

10. 📱 DESIGN:
    - Dark theme with neon green (#00ff88) accents
    - App store-like card layout
    - Glassmorphism cards
    - Mobile-first design
    - Bottom navigation bar
    - Smooth scroll
    - Loading skeleton animations
    - Toast notifications
    - Font Awesome icons CDN
    - Google Fonts Inter
    - Responsive grid layout
    - Ripple effect on buttons

11. 🔍 SEO FEATURES:
    - Each mod page has unique title: "Download [App Name] Mod APK Latest Version"
    - Meta descriptions with keywords
    - FAQ section below each mod
    - "People also downloaded" recommendations
    - Schema markup
    - Breadcrumb navigation
    - Sitemap link

12. ⚠️ DISCLAIMER SECTION:
    - Educational purposes only
    - Use at your own risk
    - Support original developers
    - We don't host files (link to external)

Make it look like a REAL working mods download website. Return COMPLETE HTML starting with <!DOCTYPE html>. Include ALL CSS in <style> and ALL JS in <script>. Do NOT wrap in markdown. Make EVERYTHING interactive.`;

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
              generationConfig: { maxOutputTokens: 8192, temperature: 0.9 },
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

    const htmlMatch = htmlCode.match(/```html\n?([\s\S]*?)```/);
    if (htmlMatch) htmlCode = htmlMatch[1];
    const startIndex = Math.max(htmlCode.indexOf("<!DOCTYPE"), htmlCode.indexOf("<html"));
    if (startIndex > 0) htmlCode = htmlCode.slice(startIndex);

    return NextResponse.json({ 
      success: true, 
      website: htmlCode, 
      niche,
      type: "mods-hub",
      includes: ["Game Mods", "WhatsApp Mods", "Instagram Mods", "Streaming Mods", "Utility Mods", "VPN Mods"]
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
