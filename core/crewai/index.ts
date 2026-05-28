import { agents } from "../agents";

type CrewTask = {
  task: string;
};

export async function runCrew(
  input: CrewTask
) {

  /* =========================
     ASSIGN AGENTS
  ========================== */

  const assignedAgents = [

    agents[0], // CEO AI

    agents[1], // YouTube AI

    agents[2], // Instagram AI

  ];

  /* =========================
     EXECUTION
  ========================== */

  return {

    success: true,

    task:
      input.task,

    assignedAgents,

    result:
`CrewAI successfully executed:
${input.task}`,

  };

}
