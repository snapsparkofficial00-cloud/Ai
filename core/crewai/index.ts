import { Runtime } from "../runtime";

type CrewRequest = {

  objective: string;

};

export async function CrewAI(
  input: CrewRequest
) {

  const outputs = [];

  /* =========================
     CEO AI
  ========================== */

  const ceo =
    await Runtime({

      agentId:
        "ceo-ai",

      input:
        `Manage this objective:
${input.objective}`,

    });

  outputs.push(ceo);

  /* =========================
     YOUTUBE AI
  ========================== */

  const youtube =
    await Runtime({

      agentId:
        "youtube-ai",

      input:
        `Create viral strategy:
${input.objective}`,

    });

  outputs.push(youtube);

  /* =========================
     INSTAGRAM AI
  ========================== */

  const instagram =
    await Runtime({

      agentId:
        "instagram-ai",

      input:
        `Create Instagram growth strategy:
${input.objective}`,

    });

  outputs.push(instagram);

  /* =========================
     REVENUE AI
  ========================== */

  const revenue =
    await Runtime({

      agentId:
        "revenue-ai",

      input:
        `Generate revenue strategy:
${input.objective}`,

    });

  outputs.push(revenue);

  return {

    success: true,

    objective:
      input.objective,

    crew:
      outputs,

  };

}
