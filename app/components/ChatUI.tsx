"use client";

import { useState } from "react";

export default function ChatUI() {

const [message, setMessage] =
useState("");

const [response, setResponse] =
useState("");

const [loading, setLoading] =
useState(false);

async function sendMessage() {

try {

  setLoading(true);

  const req =
    await fetch("/api/ai", {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json",

      },

      body: JSON.stringify({

        message,

      }),

    });

  const data =
    await req.json();

  setResponse(

    JSON.stringify(
      data,
      null,
      2
    )

  );

} catch (err) {

  console.log(err);

  setResponse(
    "AI request failed"
  );

} finally {

  setLoading(false);

}

}

return (

<main className="p-10">

  <h1 className="text-3xl font-bold">

    AI CEO Dashboard

  </h1>

  <div className="mt-6 flex gap-3">

    <input

      value={message}

      onChange={(e) =>
        setMessage(
          e.target.value
        )
      }

      placeholder="Ask AI..."

      className="border p-3 w-full rounded"

    />

    <button

      onClick={sendMessage}

      className="bg-black text-white px-6 rounded"

    >

      Send

    </button>

  </div>

  {loading && (

    <p className="mt-5">
      Thinking...
    </p>

  )}

  <pre className="mt-5 whitespace-pre-wrap">

    {response}

  </pre>

</main>

);

}
