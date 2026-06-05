import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    const prompt = `Create the ULTIMATE FREE MOVIES & ANIME streaming website for Indian audience.

THIS IS A COMPLETE ENTERTAINMENT PORTAL for Hindi-dubbed content. Make it look like a REAL streaming platform.

INCLUDE ALL THESE SECTIONS:

1. 🎬 HOLLYWOOD MOVIES IN HINDI (LATEST 2024-2025):
   - Deadpool 3 (2024) Hindi Dubbed
   - Godzilla x Kong: The New Empire Hindi Dubbed
   - Kung Fu Panda 4 Hindi Dubbed
   - Dune Part 2 Hindi Dubbed
   - Furiosa: A Mad Max Saga Hindi Dubbed
   - Inside Out 2 Hindi Dubbed
   - Despicable Me 4 Hindi Dubbed
   - Bad Boys 4 Hindi Dubbed
   - Kingdom of the Planet of the Apes Hindi
   - Venom 3 Hindi Dubbed
   - Joker 2 Hindi Dubbed
   - Gladiator 2 Hindi Dubbed
   - Mufasa: The Lion King Hindi
   - Sonic 3 Hindi Dubbed
   - Kraven the Hunter Hindi
   - Avatar 3 Hindi Dubbed
   - Fast & Furious 11 Hindi
   - Mission Impossible 8 Hindi
   - Captain America: Brave New World Hindi
   - Thunderbolts Hindi Dubbed

2. 🇯🇵 POPULAR ANIME IN HINDI:
   - Naruto All Episodes Hindi Dubbed
   - Naruto Shippuden Hindi Dubbed
   - Dragon Ball Z Hindi Dubbed
   - Dragon Ball Super Hindi Dubbed
   - One Piece Hindi Dubbed
   - Death Note Hindi Dubbed
   - Attack on Titan Hindi Dubbed
   - Demon Slayer Hindi Dubbed
   - Jujutsu Kaisen Hindi Dubbed
   - My Hero Academia Hindi Dubbed
   - Black Clover Hindi Dubbed
   - Boruto Hindi Dubbed
   - Tokyo Revengers Hindi Dubbed
   - Chainsaw Man Hindi Dubbed
   - Solo Leveling Hindi Dubbed
   - One Punch Man Hindi Dubbed
   - Spy x Family Hindi Dubbed
   - Blue Lock Hindi Dubbed
   - Haikyuu Hindi Dubbed
   - Classroom of the Elite Hindi

3. 🎥 SOUTH INDIAN MOVIES HINDI DUBBED:
   - KGF Chapter 3 Hindi Dubbed
   - Salaar Part 2 Hindi Dubbed
   - Pushpa 2 Hindi Dubbed
   - Kantara 2 Hindi Dubbed
   - Jailer 2 Hindi Dubbed
   - Leo Hindi Dubbed
   - Vikram Hindi Dubbed
   - Master Hindi Dubbed
   - Beast Hindi Dubbed
   - Varisu Hindi Dubbed

4. 📺 POPULAR WEB SERIES IN HINDI:
   - Money Heist All Seasons Hindi
   - Stranger Things Hindi Dubbed
   - Squid Game Hindi Dubbed
   - Game of Thrones Hindi
   - Breaking Bad Hindi Dubbed
   - Wednesday Hindi Dubbed
   - Lucifer Hindi Dubbed
   - The Boys Hindi Dubbed
   - Loki Hindi Dubbed
   - Moon Knight Hindi Dubbed
   - Mirzapur Season 3
   - Panchayat Season 3
   - Asur Season 3
   - The Family Man Season 3
   - Sacred Games

5. 🎯 EACH MOVIE/ANIME CARD DISPLAYS:
   - Thumbnail poster (use picsum.photos placeholder or solid color with title)
   - Title in Hindi + English
   - IMDB Rating
   - Year
   - Language: "Hindi Dubbed"
   - Quality: HD, 720p, 1080p, 4K options
   - "Watch Now" button (green)
   - "Download" button with size options:
     - 300MB, 700MB, 1.5GB, 3GB
   - "Add to Watchlist" heart button
   - Category tags: Action, Comedy, Horror, Sci-Fi
   - Brief description in Hindi

6. 📱 INTERACTIVE FEATURES:
   - Search bar with autocomplete
   - Filter: Hollywood | Anime | South | Web Series
   - Sort: Latest | Popular | IMDB Rating
   - "Continue Watching" section
   - "My Watchlist" (localStorage)
   - "Recently Added" section
   - "Trending Now" section with fire emoji
   - "Most Downloaded" section
   - "Coming Soon" section with release dates
   - Dark/Light mode toggle
   - Notification bell icon
   - Telegram channel button: "Join for instant updates"

7. 🎮 GAMIFICATION:
   - Daily check-in bonus
   - "Watch 5 movies → Unlock VIP badge"
   - Achievement system
   - User level: Beginner → Cinephile → Movie Buff → Cinema King
   - XP points for watching/downloading
   - Referral code: "Invite friends → Get VIP access"

8. 🎨 DESIGN:
   - Netflix-style dark theme
   - Large hero banner with auto-sliding featured movies
   - Horizontal scrollable movie rows
   - Glassmorphism cards with hover effects
   - Smooth animations
   - Loading skeleton placeholders
   - Movie card flip animation (front: poster, back: details)
   - Bottom navigation (mobile)
   - Font Awesome icons CDN
   - Google Fonts Inter + Poppins
   - Mobile responsive
   - Full-screen movie player UI (mock)
   - Trailer modal popup

9. 💰 MONETIZATION:
   - "Watch ad to unlock HD quality"
   - AdSense banners between rows
   - Affiliate: "Best TV for movies", "Fire Stick"
   - Premium/VIP section
   - Sponsored movie placements
   - Telegram premium channel promotion
   - "Download our app" banner

10. 🔍 SEO:
    - Each movie has: "Download [Movie Name] Hindi Dubbed HD"
    - Meta tags with trending keywords
    - FAQ: "How to download movies in Hindi?"
    - Schema markup for movies
    - Sitemap page
    - Blog section: "Top 10 Hollywood Movies 2024"
    - Social share buttons

11. 📥 DOWNLOAD PAGE (when user clicks download):
    - Movie details full page
    - Screenshots gallery
    - Download options table (quality vs size)
    - "Download will start in 10 seconds..." countdown
    - Ad display during countdown
    - "Having issues? Try alternative link"
    - Telegram group link for help
    - Similar movies recommendations
    - Comments section

12. ⚙️ USER FEATURES:
    - Create account (mock with localStorage)
    - Watch history
    - Download history
    - Favorite genres selection
    - "Because you watched..." recommendations
    - Request a movie form
    - Report broken link button
    - Share movie on WhatsApp/Facebook

Make EVERYTHING interactive with JavaScript. Use localStorage for user data. Make it look like a REAL premium streaming platform. Return COMPLETE HTML starting with <!DOCTYPE html>. Include ALL CSS in <style> and ALL JS in <script>. Do NOT wrap in markdown. Make it MASSIVE and feature-rich.`;

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
      type: "movies-hub",
      includes: ["Hollywood Hindi", "Anime Hindi", "South Movies", "Web Series", "Download", "Watchlist", "VIP System"]
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
