import { NextResponse } from "next/server";

import { AIRouter } from "../../../core/router/index";

export async function POST(req: Request) {

try {

const body = await req.json();

const result = await AIRouter({

  message: body.message,

});

return NextResponse.json({

  success: true,

  result,

});

} catch (err) {

console.log(err);

return NextResponse.json({

  success: false,

  error: "AI request failed",

});

}

}
