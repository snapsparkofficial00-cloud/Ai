export async function videoAI(
topic: string
) {

console.log(
"Generating video:",
topic
);

return {

success: true,

topic,

video:
  "/demo.mp4",

};
}
