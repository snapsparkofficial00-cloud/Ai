type BuildRequest = {

  project: string;

  type?: string;

};

export async function BuilderAI(
  input: BuildRequest
) {

  const project =
    input.project;

  const type =
    input.type || "website";

  /* =========================
     SYSTEM PROMPT
  ========================== */

  const systemPrompt = `
You are elite autonomous Builder AI.

You create:
- React apps
- SaaS systems
- Dashboards
- Landing pages
- AI websites
- Fullstack architecture
- UI systems
- APIs
- Business systems

Behave like senior software engineer.
`;

  /* =========================
     REQUEST
  ========================== */

  const response =
    await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            \`Bearer \${process.env.GROQ_API_KEY}\`,

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
\`Create a complete \${type} project:
\${project}

Include:
- folder structure
- frontend
- backend
- database
- deployment
- monetization
- scaling
\`,

            },

          ],

        }),

      }
    );

  const data =
    await response.json();

  return {

    success: true,

    project,

    type,

    result:
      data?.choices?.[0]?.message
        ?.content ||

      "⚠️ Builder failed",

  };

}
