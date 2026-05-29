import { NextResponse }
from "next/server";

import { workflowEngine }
from "../../../core/runtime/workflow-engine";

export async function GET() {

  const tasks =
    workflowEngine.getTasks();

  return NextResponse.json({

    success: true,

    total:
      tasks.length,

    tasks,

  });

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
