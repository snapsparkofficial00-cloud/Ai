import { NextResponse }
from "next/server";

import { workflowEngine }
from "../../../core/runtime/workflow-engine";

export async function GET() {

  try {

    const tasks =
      workflowEngine.getTasks();

    const stats =
      workflowEngine.getStats();

    return NextResponse.json({

      success: true,

      stats,

      total:
        tasks.length,

      tasks,

      updatedAt:
        new Date(),

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      error:
        "Failed to load workflow",

    });

  }

}

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const result =
      await workflowEngine.createTask(

        body.agent ||
          "ceo-ai",

        body.input ||
          body.objective ||
          "No objective"

      );

    return NextResponse.json({

      success: true,

      result,

      message:
        "Workflow executed successfully",

      createdAt:
        new Date(),

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      error:
        "Workflow execution failed",

    });

  }

}
