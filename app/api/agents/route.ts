import { NextResponse }
from "next/server";

import { agents }
from "../../../core/agents";

export async function GET() {

  return NextResponse.json({

    success: true,

    total:
      agents.length,

    agents,

  });

}
