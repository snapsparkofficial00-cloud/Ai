import { Runtime } from "../runtime";

type AutoGPTRequest = {

  goal: string;

};

export async function AutoGPT(
  input: AutoGPTRequest
) {

  const workflow = [];

  /* =========================
     CEO AI
  ========================== */

  const ceo =
    await Runtime({

      agentId:
        "ceo-ai",

      input:
        `Plan this goal:
${input.goal}`,

    });

  workflow.push(ceo);

  /* =========================
     AUTOMATION AI
  ========================== */

  const automation =
    await Runtime({

      agentId:
        "automation-ai",

      input:
        `Create automation workflow:
${input.goal}`,

    });

  workflow.push(automation);

  /* =========================
     REVENUE AI
  ========================== */

  const revenue =
    await Runtime({

      agentId:
        "revenue-ai",

      input:
        `Monetize this idea:
${input.goal}`,

    });

  workflow.push(revenue);

  return {

    success: true,

    goal:
      input.goal,

    workflow,

  };

}
