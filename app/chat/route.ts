export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: body.message,
      }),
    }
  );

  const data = await response.json();

  return Response.json({
    reply: data[0]?.generated_text || "No response",
  });
}
