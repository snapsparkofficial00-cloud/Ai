export async function generateVoice(
text: string
) {

console.log(
"Generating voice:",
text
);

return {
success: true,
audio: "/output.mp3",
};
}
