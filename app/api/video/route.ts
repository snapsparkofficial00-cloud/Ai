import { NextResponse }
from "next/server";

import { videoAI }
from "../../../core/media/video-ai";

export async function POST(
req: Request
) {
try {

const body =
  await req.json();

const result =
  await videoAI(
    body.topic || "Untitled"
  );

return NextResponse.json(
  result
);

} catch (error) {

console.error(error);

return NextResponse.json(
  {
    success: false,
    error:
      "Video generation failed",
  },
  {
    status: 500,
  }
);

}
}
