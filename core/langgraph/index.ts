type GraphNode = {

  id: string;

  task: string;

};

type LangGraphInput = {

  goal: string;

};

export async function LangGraph(
  input: LangGraphInput
) {

  const goal =
    input.goal;

  /* =========================
     GRAPH WORKFLOW
  ========================== */

  const graph: GraphNode[] = [

    {
      id: "1",
      task: "Research",
    },

    {
      id: "2",
      task: "Planning",
    },

    {
      id: "3",
      task: "Architecture",
    },

    {
      id: "4",
      task: "Execution",
    },

    {
      id: "5",
      task: "Optimization",
    },

  ];

  const outputs = [];

  for (const node of graph) {

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

            max_tokens: 1200,

            messages: [

              {

                role: "system",

                content:
`
You are LangGraph AI.

Current node:
${node.task}

Goal:
${goal}
`,

              },

            ],

          }),

        }
      );

    const data =
      await response.json();

    outputs.push({

      node:
        node.task,

      output:
        data?.choices?.[0]?.message
          ?.content ||

        "⚠️ Failed",

    });

  }

  return {

    success: true,

    goal,

    graph:
      outputs,

  };

}
