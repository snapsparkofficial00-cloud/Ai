import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    const prompt = `Create the ULTIMATE FREE SOCIAL MEDIA GROWTH website for: "${niche}".

THIS IS A FREE SMM PANEL where users get FREE followers, likes, views, subscribers, comments, story views, and more across ALL platforms. Make it look like a REAL working SMM service.

INCLUDE ALL THESE SERVICES:

1. 📸 INSTAGRAM SERVICES:
   - Free Instagram Followers (100, 500, 1000, 5000 options)
   - Free Instagram Likes (auto likes on new posts)
   - Free Instagram Views (reels + story views)
   - Free Instagram Comments (custom or random)
   - Free Instagram Story Views
   - Free Instagram Live Viewers
   - Instagram Verification Badge Trick
   - Instagram Account Growth Tips

2. 📺 YOUTUBE SERVICES:
   - Free YouTube Subscribers
   - Free YouTube Views (video views)
   - Free YouTube Likes
   - Free YouTube Comments
   - Free YouTube Watch Time (4000 hours trick)
   - Free YouTube Shorts Views
   - YouTube Monetization Guide
   - YouTube SEO Tips

3. 🎵 TIKTOK SERVICES:
   - Free TikTok Followers
   - Free TikTok Likes
   - Free TikTok Views
   - Free TikTok Comments
   - TikTok Viral Hashtags

4. 👥 FACEBOOK SERVICES:
   - Free Facebook Followers
   - Free Facebook Likes (page + post)
   - Free Facebook Friends
   - Free Facebook Comments
   - Free Facebook Group Members

5. 🐦 TWITTER/X SERVICES:
   - Free Twitter Followers
   - Free Twitter Likes
   - Free Twitter Retweets
   - Free Twitter Comments
   - Twitter Blue Alternative

6. 📱 WHATSAPP SERVICES:
   - WhatsApp Group Members Add
   - WhatsApp Channel Followers
   - WhatsApp Status Views
   - WhatsApp Auto Reply Trick

7. 🎮 OTHER PLATFORMS:
   - Free Discord Members
   - Free Telegram Subscribers
   - Free Snapchat Followers
   - Free LinkedIn Connections
   - Free Pinterest Followers
   - Free Threads Followers
   - Free Moj/Chingari Followers

8. 🪙 COIN/EARNING SYSTEM:
   - "Earn Coins" by completing tasks
   - Daily login bonus: 100 coins
   - Watch ad: 50 coins
   - Share app: 200 coins
   - Invite friends: 500 coins each
   - Follow our social: 100 coins
   - Spin wheel: Win 10-1000 coins
   - Scratch card: Win random coins
   - Daily tasks list
   - Coin balance display in header
   - Leaderboard: Top earners

9. 📊 HOW THE SERVICE WORKS:
   - User enters their profile/username
   - Select service (followers, likes, etc.)
   - Select quantity
   - Click "Submit Order"
   - Show progress bar animation
   - "Delivered!" notification
   - Order history in user dashboard
   - Referral link to earn more coins
   - "Complete offers to speed up delivery"

10. 🎯 GAMIFICATION:
    - User levels: Bronze → Silver → Gold → Diamond → VIP
    - XP bar showing level progress
    - Achievement badges: "100 orders", "1000 coins", "VIP member"
    - Daily streak bonus
    - "Spin & Win" wheel
    - "Lucky Draw" daily contest
    - Referral leaderboard

11. 🎨 DESIGN:
    - Dark theme with gradient accents (purple, pink, blue)
    - TikTok-style bottom navigation
    - Glassmorphism cards
    - Animated number counters
    - Pulse animations on buttons
    - Confetti effect on order completion
    - Loading skeletons
    - Toast notifications
    - Font Awesome CDN
    - Google Fonts Inter + Poppins
    - Mobile-first responsive
    - PWA ready

12. 💰 MONETIZATION:
    - AdSense banner between services
    - "Watch video to get FREE coins"
    - Affiliate: "Need a phone for social media?"
    - Premium/VIP section: "Get faster delivery"
    - Sponsored: "Best social media tools"
    - Offer wall: Complete offers for coins
    - Telegram premium channel

13. 📱 PAGES:
    - Home: All services grid
    - Services: Category-wise listing
    - Dashboard: Order history, stats
    - Earn Coins: All earning methods
    - Leaderboard: Top users
    - Profile: User settings
    - Referral: Share link page

14. 🔍 SEO:
    - Title: "Free Instagram Followers - Get 1000+ Real Followers Free"
    - Meta: "Get free followers, likes, views on Instagram, YouTube, TikTok. Real SMM panel. No password needed."
    - FAQ section
    - Blog section with social media tips
    - Schema markup

Make EVERYTHING interactive with JavaScript. Use localStorage for user data. Make it look like a REAL working SMM panel. Return COMPLETE HTML starting with <!DOCTYPE html>. Do NOT wrap in markdown.`;

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
      type: "smm-panel",
      includes: ["Instagram", "YouTube", "TikTok", "Facebook", "Twitter", "WhatsApp", "Coin System", "Spin Wheel", "Referral"]
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
