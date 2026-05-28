import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    return NextResponse.json({

      success: true,

      reply: `
👑 CEO AI RESPONSE

Message:
${body.message}

✅ CEO AI ONLINE
✅ Website AI ACTIVE
✅ YouTube AI ACTIVE
✅ Instagram AI ACTIVE
✅ Revenue AI ACTIVE
✅ Automation AI ACTIVE

System stable and running successfully.
      `,

    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({

      success: false,

      error: "AI request failed",

    });

  }

}
