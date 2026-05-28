export async function GroqProvider(
  prompt: string
) {

  try {

    const response =
      await fetch(

        "https://api.groq.com/openai/v1/chat/completions",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${process.env.GROQ_API_KEY}`,

          },

          body: JSON.stringify({

            model:
              "llama-3.3-70b-versatile",

            temperature: 0.7,

            messages: [

              {

                role: "user",

                content:
                  prompt,

              },

            ],

          }),

        }

      );

    const data =
      await response.json();

    return {

      success: true,

      response:
        data?.choices?.[0]?.message
          ?.content ||

        "No response",

    };

  } catch (err) {

    console.log(err);

    return {

      success: false,

      response:
        "Provider failed",

    };

  }

}
