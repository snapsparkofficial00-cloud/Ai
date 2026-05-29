import { NextResponse }
from "next/server";

import { workflowEngine }
from "../../../core/runtime/workflow-engine";

import { agents }
from "../../../core/agents";

import { GetMemory }
from "../../../core/memory";

import { getLogs }
from "../../../core/logs";

export async function GET() {

  try {

    const tasks =
      workflowEngine.getTasks();

    const stats =
      workflowEngine.getStats();

    const memory =
      await GetMemory();

    const logs =
      getLogs();

    return NextResponse.json({

      success: true,

      system: {

        status:
          "ONLINE",

        ai:
          "ACTIVE",

        version:
          "AI OS v1",

        uptime:
          process.uptime(),

        timestamp:
          new Date(),

      },

      stats: {

        totalAgents:
          agents.length,

        runningTasks:
          stats.running,

        completedTasks:
          stats.completed,

        failedTasks:
          stats.failed,

        queuedTasks:
          stats.queued,

        totalTasks:
          stats.total,

        memoryStored:
          memory.length,

        logs:
          logs.length,

      },

      activeAgents:

        agents.map(
          (a) => ({

            id: a.id,

            name: a.name,

            role: a.role,

            status: a.status,

          })
        ),

      latestTasks:
        tasks.slice(0, 10),

      latestLogs:
        logs.slice(0, 10),

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      error:
        "System API failed",

    });

  }

}
