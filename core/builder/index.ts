type BuilderRequest = {

  project: string;

  type?: string;

};

export async function BuilderAI(
  input: BuilderRequest
) {

  const project =
    input.project;

  /* =========================
     WEBSITE GENERATION
  ========================== */

  const websiteResponse =
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

          max_tokens: 2000,

          messages: [

            {

              role: "system",

              content:
`
You are elite AI Website Architect.

Generate:
- frontend
- backend
- UI structure
- API architecture
- database structure
- deployment plan
- automation system

Behave like elite startup CTO.
`,

            },

            {

              role: "user",

              content:
project,

            },

          ],

        }),

      }
    );

  const websiteData =
    await websiteResponse.json();

  /* =========================
     UI GENERATION
  ========================== */

  const uiResponse =
    await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

        },

        body: JSON.stringify({

          contents: [

            {

              parts: [

                {

                  text:
`
Generate futuristic UI design system for:

${project}

Include:
- colors
- layout
- animations
- sections
- mobile responsiveness
- dashboard UI
`,

                },

              ],

            },

          ],

        }),

      }
    );

  const uiData =
    await uiResponse.json();

  return {

    success: true,

    project,

    architecture:
      websiteData?.choices?.[0]
        ?.message?.content ||

      "⚠️ Failed",

    ui:
      uiData?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text ||

      "⚠️ UI Failed",

  };

}
