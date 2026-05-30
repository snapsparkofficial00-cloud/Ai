export async function videoAI(
topic: string
) {

const script = `
Welcome to AI OS.

Today's topic is ${topic}.

In this video we will explore:

1. What it is
2. Why it matters
3. How to use it

Thanks for watching.
`;

return {
success: true,
topic,
script,
video: null,
};
}
