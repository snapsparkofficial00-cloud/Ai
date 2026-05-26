import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">

      {/* HERO */}
      <section className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">

          {/* LEFT */}
          <div className="flex-1">

            <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              AI Operating System
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              FUTURE AI
              <br />
              ECOSYSTEM
            </h1>

            <p className="text-slate-400 text-xl mt-8 leading-9 max-w-3xl">
              Autonomous AI infrastructure with AI agents,
              automation systems, analytics intelligence,
              terminal access, cloud orchestration,
              revenue systems, and futuristic AI operations.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/assistant"
                className="px-6 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition font-bold text-lg"
              >
                🤖 AI Assistant
              </Link>

              <Link
                href="/agents"
                className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition font-bold text-lg border border-slate-700"
              >
                🧠 AI Agents
              </Link>

              <Link
                href="/terminal"
                className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition font-bold text-lg border border-slate-700"
              >
                💻 Terminal
              </Link>

            </div>

          </div>

          {/* RIGHT STATUS */}
          <div className="w-full lg:w-[380px]">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-3xl font-bold mb-8">
                🟢 System Status
              </h2>

              <div className="space-y-5 text-lg">

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    AI Core
                  </span>
                  <span className="text-green-400">
                    ACTIVE
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Automation
                  </span>
                  <span className="text-cyan-400">
                    RUNNING
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Cloud Sync
                  </span>
                  <span className="text-blue-400">
                    CONNECTED
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    CEO AI
                  </span>
                  <span className="text-purple-400">
                    ONLINE
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto mt-20">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card
            title="AI Agents"
            value="12"
            color="text-cyan-400"
            icon="🤖"
          />

          <Card
            title="Automation"
            value="128"
            color="text-green-400"
            icon="⚡"
          />

          <Card
            title="Revenue"
            value="$24.8K"
            color="text-yellow-400"
            icon="💰"
          />

          <Card
            title="Cloud Systems"
            value="99.9%"
            color="text-purple-400"
            icon="☁️"
          />

        </div>

      </section>

      {/* MODULES */}
      <section className="max-w-7xl mx-auto mt-24">

        <h2 className="text-5xl font-bold mb-12">
          AI Infrastructure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <Module
            title="YouTube AI"
            desc="Autonomous YouTube content generation and analytics intelligence."
          />

          <Module
            title="Telegram AI"
            desc="Remote AI control center with automation monitoring."
          />

          <Module
            title="Security AI"
            desc="Realtime system protection and cloud security intelligence."
          />

          <Module
            title="CEO Dashboard"
            desc="Executive AI operating center for futuristic command orchestration."
          />

          <Module
            title="Terminal AI"
            desc="Advanced terminal execution and autonomous scripting engine."
          />

          <Module
            title="Revenue AI"
            desc="AI monetization tracking and autonomous income analytics."
          />

        </div>

      </section>

    </div>
  );
}

function Card({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition">

      <div className="text-4xl mb-5">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className={`text-5xl font-black mt-4 ${color}`}>
        {value}
      </p>

    </div>
  );
}

function Module({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition">

      <h2 className="text-3xl font-bold mb-5">
        {title}
      </h2>

      <p className="text-slate-400 text-lg leading-8">
        {desc}
      </p>

    </div>
  );
}
