import { NextResponse }
from "next/server";

import { PlannerAI }
from "@/core/planner";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const result =
      await PlannerAI(
        body.goal
      );

    return NextResponse.json(
      result
    );

  } catch (error) {

    return NextResponse.json({

      success: false,

      error:
        "Planner AI failed",

    });
  }
}
