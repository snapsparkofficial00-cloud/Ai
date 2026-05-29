import { NextResponse }
from "next/server";

export async function GET() {

  return NextResponse.json({

    status: "ONLINE",

    agents: 11,

    tasksRunning: 4,

    memoryStored: 248,

    uptime: "99.9%",

  });

}
