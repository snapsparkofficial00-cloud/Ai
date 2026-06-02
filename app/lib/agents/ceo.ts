interface CEOCommand {
  command: string;
  action: string;
  params: Record<string, any>;
}

export async function ceoDecision(context: string): Promise<CEOCommand> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  const prompt = `
You are the CEO AI of an autonomous YouTube system.
Context: ${context}

Decide what to do next. Return ONLY JSON:
{
  "command": "generate_script" or "upload_video" or "analyze_performance" or "optimize_thumbnail",
  "action": "specific action description",
  "params": { "niche": "string", "type": "short/long" }
}`;

  if (GROQ_KEY) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    try {
      return JSON.parse(data.choices[0]?.message?.content || "{}");
    } catch {
      return { command: "generate_script", action: "Create viral content", params: { niche: "general", type: "short" } };
    }
  }
  
  return { command: "generate_script", action: "Create viral content", params: { niche: "general", type: "short" } };
}

export async function runCEOStrategy(niche: string): Promise<any> {
  const decision = await ceoDecision(`Current niche: ${niche}. Need viral YouTube strategy.`);
  
  console.log(`👑 CEO AI Decision: ${decision.command} - ${decision.action}`);
  
  return {
    success: true,
    decision,
    timestamp: new Date().toISOString(),
  };
}
