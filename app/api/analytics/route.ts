import { NextResponse }
from "next/server";

import { getAnalytics }
from "../../../core/analytics";

import { getSystemMonitor }
from "../../../core/runtime/system-monitor";

export async function GET() {

  return NextResponse.json({

    success: true,

    analytics:
      getAnalytics(),

    system:
      getSystemMonitor(),

  });

}
