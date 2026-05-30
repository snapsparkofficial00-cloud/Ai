import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    memory: [
      {
        id: 1,
        content: "Memory system working"
      }
    ]
  });
}
