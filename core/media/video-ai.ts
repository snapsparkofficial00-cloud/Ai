import { generateVoice }
from "./voice-ai";

export async function videoAI(
topic: string
) {

const script = `
Welcome to AI OS.

Today's topic is ${topic}.
`;

const voice =
await generateVoice(
script
);

return {

success: true,

topic,

script,

audio:
  voice.audio,

video: null,

};
}
