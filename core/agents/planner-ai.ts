import { agentBus }
from "../runtime/agent-bus";

export async function plannerAI(
  goal: string
) {

  const tasks = [

    {
      agent:
        "website-ai",

      input:
        `Build website for:
${goal}`,
    },

    {
      agent:
        "automation-ai",

      input:
        `Automate workflow for:
${goal}`,
    },

    {
      agent:
        "revenue-ai",

      input:
        `Generate revenue strategy for:
${goal}`,
    },

  ];

  agentBus.send(

    "planner-ai",

    "all-agents",

    `Execution plan created for:
${goal}`

  );

  return {

    success: true,

    goal,

    tasks,

  };

}
