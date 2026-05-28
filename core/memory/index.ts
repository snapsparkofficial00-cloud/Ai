type MemoryInput = {

  agent: string;

  message: string;

  response: string;

};

export async function MemoryAI(
  input: MemoryInput
) {

  try {

    await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,
      {

        method: "POST",

        headers: {

          apikey:
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

          Authorization:
`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,

          "Content-Type":
            "application/json",

          Prefer:
            "return=minimal",

        },

        body: JSON.stringify({

          agent:
            input.agent,

          message:
            input.message,

          response:
            input.response,

          created_at:
            new Date(),

        }),

      }
    );

    return {

      success: true,

    };

  } catch (err) {

    console.log(
      "MEMORY ERROR:",
      err
    );

    return {

      success: false,

    };

  }

}

/* =========================
   GET MEMORY
========================== */

export async function GetMemory() {

  try {

    const response =
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory?select=*`,
        {

          headers: {

            apikey:
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

            Authorization:
`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,

          },

        }
      );

    const data =
      await response.json();

    return data;

  } catch (err) {

    console.log(err);

    return [];

  }

}
