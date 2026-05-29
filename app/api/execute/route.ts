import { NextResponse }
from "next/server";

import { plannerAI }
from "../../../core/agents/planner-ai";

import { executorAI }
from "../../../core/agents/executor-ai";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const plan =
      await plannerAI(
        body.goal
      );

    const execution =
      await executorAI(
        plan.tasks
      );

    return NextResponse.json({

      success: true,

      goal:
        body.goal,

      plan,

      execution,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      error:
        "Execution failed",

    });

  }

}
