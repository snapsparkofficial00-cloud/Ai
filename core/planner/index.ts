export async function PlannerAI(
  goal: string
) {

  return {

    success: true,

    goal,

    tasks: [

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

    ],

  };
}
