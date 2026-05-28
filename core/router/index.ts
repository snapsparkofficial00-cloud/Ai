import { crewAI } from "../crewai";
import { LangGraph } from "../langgraph";
import { OpenDevin } from "../opendevin";
import { AutoGPT } from "../autogpt";
import { MemoryAI } from "../memory";

export async function AIRouter(
  task: string
) {

  const lower =
    task.toLowerCase();

  let system =
    "CEO AI";

  /* =========================
     WEBSITE TASKS
  ========================== */

  if (
    lower.includes("website") ||
    lower.includes("web") ||
    lower.includes("dashboard")
  ) {

    system =
      "Website AI";

    await OpenDevin.execute(
      task
    );

  }

  /* =========================
     AUTOMATION TASKS
  ========================== */

  else if (
    lower.includes("automation") ||
    lower.includes("workflow")
  ) {

    system =
      "Automation AI";

    await AutoGPT.execute(
      task
    );

  }

  /* =========================
     START CREW
  ========================== */

  const crew =
    crewAI.execute(task);

  /* =========================
     START WORKFLOW
  ========================== */

  const workflow =
    LangGraph.execute(system);

  /* =========================
     SAVE MEMORY
  ========================== */

  MemoryAI.save(

    system,

    task,

    "Task executed successfully"

  );

  /* =========================
     FINAL RESPONSE
  ========================== */

  return {

    success: true,

    system,

    crew,

    workflow,

    timestamp:
      new Date(),

  };

}
