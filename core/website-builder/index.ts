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

  await AutoGPT.execute(

    `Build website for: ${idea}`

  );

  /* =========================
     STEP 3
     OPENDEVIN CODING
  ========================== */

  await OpenDevin.execute(

    `Generate website architecture for ${idea}`

  );

  /* =========================
     STEP 4
     MEMORY SAVE
  ========================== */

  MemoryAI.save(

    "Website AI",

    idea,

    "Website generation completed"

  );

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
