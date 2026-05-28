import { agents } from "../agents";

type CrewTask = {

  id: string;

  task: string;

  status: string;

  assignedAgents: any[];

  createdAt: string;

};

export async function runCrew(
  task: string
): Promise<CrewTask> {

  console.log("🚀 CrewAI STARTED");

  /* =========================
     DETECT TASK TYPE
  ========================== */

  const lower =
    task.toLowerCase();

  let assignedAgents = [

    agents.ceo,

  ];

  /* =========================
     WEBSITE TASK
  ========================== */

  if (
    lower.includes("website") ||
    lower.includes("web") ||
    lower.includes("dashboard")
  ) {

    assignedAgents = [

      agents.ceo,
      agents.website,
      agents.analytics,
      agents.revenue,

    ];

  }

  /* =========================
     YOUTUBE TASK
  ========================== */

  else if (
    lower.includes("youtube") ||
    lower.includes("shorts") ||
    lower.includes("viral")
  ) {

    assignedAgents = [

      agents.ceo,
      agents.analytics,
      agents.revenue,

    ];

  }

  /* =========================
     APP TASK
  ========================== */

  else if (
    lower.includes("app") ||
    lower.includes("android") ||
    lower.includes("ios")
  ) {

    assignedAgents = [

      agents.ceo,
      agents.app,
      agents.revenue,

    ];

  }

  /* =========================
     GAME TASK
  ========================== */

  else if (
    lower.includes("game")
  ) {

    assignedAgents = [

      agents.ceo,
      agents.game,
      agents.revenue,

    ];

  }

  /* =========================
     AUTOMATION TASK
  ========================== */

  else if (
    lower.includes("automation") ||
    lower.includes("workflow")
  ) {

    assignedAgents = [

      agents.ceo,
      agents.automation,

    ];

  }

  /* =========================
     CREATE TASK OBJECT
  ========================== */

  const crewTask = {

    id:
      crypto.randomUUID(),

    task,

    status:
      "running",

    assignedAgents,

    createdAt:
      new Date().toISOString(),

  };

  /* =========================
     LOGGING
  ========================== */

  console.log(
    "🧠 ACTIVE AGENTS:",
    assignedAgents.map(
      (a) => a.name
    )
  );

  console.log(
    "📌 TASK:",
    task
  );

  /* =========================
     SIMULATION
  ========================== */

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 1000)
  );

  console.log(
    "✅ CrewAI COMPLETE"
  );

  return crewTask;

}
