import { NextResponse }
from "next/server";

import { videoAI }
from "@/core/media/video-ai";

export async function POST(
req: Request
) {

try {

const body =
  await req.json();

const result =
  await videoAI(
    body.topic
  );

return NextResponse.json(
  result
);

} catch (error) {

console.log(error);

return NextResponse.json({

  success: false,

  error:
    "Video generation failed",

});

}
}
