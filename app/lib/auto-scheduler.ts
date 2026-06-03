// Auto scheduler that runs continuously
let scheduleInterval: NodeJS.Timeout | null = null;

export function startAutoScheduler() {
  if (scheduleInterval) return;
  
  console.log("🤖 Auto Scheduler STARTED - Will generate content every 30 minutes");
  
  scheduleInterval = setInterval(async () => {
    console.log("🔄 Auto scheduler running at:", new Date().toLocaleTimeString());
    
    const niches = ["Supercars", "AI Tech", "Finance", "Gaming", "Space"];
    const randomNiche = niches[Math.floor(Math.random() * niches.length)];
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/youtube/autonomous`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "generate", 
          niche: randomNiche,
          type: "short",
          autoMode: true 
        }),
      });
      
      const data = await response.json();
      console.log(`✅ Auto-generated: ${data.title || "Video"} for ${randomNiche}`);
      
    } catch (error) {
      console.log("Auto generation error:", error);
    }
  }, 30 * 60 * 1000); // Every 30 minutes
}

export function stopAutoScheduler() {
  if (scheduleInterval) {
    clearInterval(scheduleInterval);
    scheduleInterval = null;
    console.log("🛑 Auto Scheduler STOPPED");
  }
}
