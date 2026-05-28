type OpenDevinRequest = {

  task: string;

};

export async function OpenDevin(
  input: OpenDevinRequest
) {

  const task =
    input.task;

  /* =========================
     DEVIN AI SYSTEM
  ========================== */

  const systemPrompt = `
You are OpenDevin AI.

You are autonomous software engineer AI.

You can:
- write code
- debug systems
- fix errors
- improve architecture
- optimize performance
- build APIs
- build frontend
- build backend
- deploy apps

Behave like elite developer AI.
`;

  const response =
    await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "Authorization": "Bearer " + process.env.GROQ_API_KEY,

        },

        body: JSON.stringify({

          model:
"llama-3.3-70b-versatile",

          temperature: 0.7,

          max_tokens: 1800,

          messages: [

            {

              role: "system",

              content:
                systemPrompt,

            },

            {

              role: "user",

              content:
                task,

            },

          ],

        }),

      }
    );

  const data =
    await response.json();

  return {

    success: true,

    task,

    result:
      data?.choices?.[0]?.message
        ?.content ||

      "⚠️ OpenDevin failed",

  };

}
