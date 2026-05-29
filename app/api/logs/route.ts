import { NextResponse }
from "next/server";

import { getLogs }
from "../../../core/logs";

export async function GET() {

  return NextResponse.json({

    success: true,

    logs:
      getLogs(),

  });

}
