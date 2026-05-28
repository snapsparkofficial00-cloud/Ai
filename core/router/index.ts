import { CrewAI } from "../crewai";
import { LangGraph } from "../langgraph";
import { OpenDevin } from "../opendevin";
import { AutoGPT } from "../autogpt";
import { BuilderAI } from "../builder";

type RouterRequest = {

  message: string;

};

export async function AIRouter(
  input: RouterRequest
) {

  const lower =
    input.message.toLowerCase();

  /* =========================
     WEBSITE TASKS
  ========================== */

  if (
    lower.includes("website") ||
    lower.includes("app") ||
    lower.includes("dashboard")
  ) {

    return await BuilderAI({

      project:
        input.message,

      type:
        "website",

    });

  }

  /* =========================
     AUTONOMOUS TASKS
  ========================== */

  if (
    lower.includes("autonomous") ||
    lower.includes("goal") ||
    lower.includes("execute")
  ) {

    return await AutoGPT({

      goal:
        input.message,

    });

  }

  /* =========================
     GRAPH TASKS
  ========================== */

  if (
    lower.includes("workflow") ||
    lower.includes("pipeline")
  ) {

    return await LangGraph({

      goal:
        input.message,

    });

  }

  /* =========================
     DEVELOPMENT TASKS
  ========================== */

  if (
    lower.includes("bug") ||
    lower.includes("fix") ||
    lower.includes("code")
  ) {

    return await OpenDevin({

      task:
        input.message,

    });

  }

  /* =========================
     DEFAULT CREW AI
  ========================== */

  return await CrewAI({

    objective:
      input.message,

  });

}
