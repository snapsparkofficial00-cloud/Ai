import { agents } from "../agents";

type RuntimeTask = {
  agentId: string;
  input: string;
};

export async function Runtime(
  task: RuntimeTask
) {

  const agent = agents.find(
    (a) => a.id === task.agentId
  );

  if (!agent) {

    return {

      success: false,

      error: "Agent not found",

    };

  }

  console.log(
    `⚡ Running Agent: ${agent.name}`
  );

  /* =========================
     OPENAI / GROQ EXECUTION
  ========================== */

  let response = "";

  try {

    const aiResponse =
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

            messages: [

              {

                role: "system",

                content:
                  `You are ${agent.name}.
Role: ${agent.role}`,

              },

              {

                role: "user",

                content:
                  task.input,

              },

            ],

          }),

        }

      );

    const data =
      await aiResponse.json();

    response =
      data?.choices?.[0]?.message
        ?.content ||

      "No response";

  } catch (err) {

    console.log(err);

    return {

      success: false,

      error:
        "Runtime execution failed",

    };

  }

  return {

    success: true,

    agent:
      agent.name,

    response,

  };

}
