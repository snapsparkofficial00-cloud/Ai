import { NextResponse }
from "next/server";

import { getLogs }
from "../../../core/logs";

export async function GET() {

  try {

    const logs =
      getLogs();

    return NextResponse.json({

      success: true,

      total:
        logs.length,

      logs,

      updatedAt:
        new Date(),

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      error:
        "Failed to fetch logs",

    });

  }

}
