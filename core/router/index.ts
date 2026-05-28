import { runCrew } from "../crewai";

export async function router(
  task: string
) {

  const lower =
    task.toLowerCase();

  /* =========================
     WEBSITE TASK
  ========================== */

  if (
    lower.includes("website") ||
    lower.includes("web")
  ) {

    return await runCrew({

      task,

    });

  }

  /* =========================
     DEFAULT
  ========================== */

  return {

    success: true,

    result:
      "Router executed successfully",

  };

}
