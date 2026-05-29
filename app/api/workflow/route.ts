import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Workflow API online",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json({
      success: true,
      workflow: {
        objective: body.objective || "No objective",
        status: "running",
      },
      message: "Workflow executed successfully",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      error: "Workflow execution failed",
    });
  }
}
