import { NextResponse }
from "next/server";

import { workflowEngine }
from "../../../core/runtime/workflow-engine";

import { agents }
from "../../../core/agents";

import { GetMemory }
from "../../../core/memory";

export async function GET() {

  const tasks =
    workflowEngine.getTasks();

  const memory =
    await GetMemory();

  return NextResponse.json({

    status: "ONLINE",

    agents:
      agents.length,

    tasksRunning:
      tasks.filter(
        (t) =>
          t.status === "running"
      ).length,

    totalTasks:
      tasks.length,

    memoryStored:
      memory.length,

    activeAgents:
      agents.map(
        (a) => ({
          id: a.id,
          name: a.name,
          status: a.status,
        })
      ),

  });

}
