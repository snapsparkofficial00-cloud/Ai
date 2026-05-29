import { NextResponse } from "next/server";

import {
  workflowEngine,
} from "@/core/runtime/workflow-engine";

export async function POST(req: Request) {
  const body = await req.json();

  const result =
    await workflowEngine.createTask(
      body.agent,
      body.input
    );

  return NextResponse.json(result);
}
