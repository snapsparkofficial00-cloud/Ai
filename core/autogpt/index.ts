type AutoGPTRequest = {

  goal: string;

};

export async function AutoGPT(
  input: AutoGPTRequest
) {

  const goal =
    input.goal;

  const tasks = [

    "Research",

    "Planning",

    "Execution",

    "Optimization",

    "Scaling",

  ];

  const results = [];

  for (const step of tasks) {

    const response =
      await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${process.env.GROQ_API_KEY}`,

          },

          body: JSON.stringify({

            model:
              "llama-3.3-70b-versatile",

            temperature: 0.7,

            max_tokens: 1200,

            messages: [

              {

                role: "system",

                content:
`
You are autonomous AutoGPT AI.

You complete goals step-by-step.

Current phase:
${step}
`,

              },

              {

                role: "user",

                content:
                  goal,

              },

            ],

          }),

        }
      );

    const data =
      await response.json();

    results.push({

      step,

      output:
        data?.choices?.[0]?.message
          ?.content ||

        "⚠️ Failed",

    });

  }

  return {

    success: true,

    goal,

    workflow:
      results,

  };

}
