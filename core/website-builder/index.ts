import { OpenDevin } from "../opendevin";
import { AutoGPT } from "../autogpt";
import { MemoryAI } from "../memory";

export async function buildWebsite(
  idea: string
) {

  console.log(
    "🌐 WEBSITE AI STARTED"
  );

  /* =========================
     STEP 1
     ANALYZE IDEA
  ========================== */

  const analysis = {

    name:
      "AI Generated Website",

    stack: [

      "Next.js",

      "TailwindCSS",

      "TypeScript",

      "Supabase",

    ],

    pages: [

      "Home",

      "Dashboard",

      "Pricing",

      "Login",

      "Admin",

    ],

  };

  /* =========================
     STEP 2
     AUTOGPT EXECUTION
  ========================== */

  await AutoGPT({

    goal:
      `Build website for: ${idea}`

  });

  /* =========================
     STEP 3
     OPENDEVIN CODING
  ========================== */

  await OpenDevin({

    task:
      `Generate website architecture for ${idea}`

  });

  /* =========================
     STEP 4
     MEMORY SAVE
  ========================== */

  await MemoryAI({

    agent:
      "Website AI",

    message:
      idea,

    response:
      "Website generation completed",

  });

  /* =========================
     FINAL RESPONSE
  ========================== */

  return {

    success: true,

    project: analysis,

    deployment:
      "pending",

    status:
      "website generated",

  };

}
