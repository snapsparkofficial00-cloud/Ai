import { workflowEngine }
from "../runtime/workflow-engine";

export async function PlannerAI(
  goal: string
) {

  const tasks = [

    {
      agent: "ceo-ai",

      input:
        `Analyze objective: ${goal}`,
    },

    {
      agent: "youtube-ai",

      input:
        `Generate viral strategy for: ${goal}`,
    },

    {
      agent: "website-ai",

      input:
        `Build website strategy for: ${goal}`,
    },

    {
      agent: "revenue-ai",

      input:
        `Create monetization plan for: ${goal}`,
    },

  ];

  const results = [];

  for (const task of tasks) {

    const result =
      await workflowEngine.createTask(
        task.agent,
        task.input
      );

    results.push(result);
  }

  return {

    success: true,

    goal,

    tasks,

    results,

  };
}
