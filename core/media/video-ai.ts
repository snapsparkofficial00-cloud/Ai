import { generateVoice }
from "./voice-ai";

import { renderVideo }
from "./video-renderer";

export async function videoAI(
topic: string
) {

console.log(
"Creating AI video:",
topic
);

// Step 1 — Generate Script

const script = `

Welcome to AI OS.

Today we are talking about
${topic}.

This video was generated
completely by AI automation.

`;

// Step 2 — Generate Voice

await generateVoice(
script
);

// Step 3 — Render Video

await renderVideo();

return {

success: true,

topic,

script,

video:
  "/final.mp4",

};
}
