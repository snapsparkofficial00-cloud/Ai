import Link from "next/link";

export default function HomePage() {
return (
<div className="min-h-screen bg-[#020617] text-white p-6 lg:p-10">

  {/* HERO */}

  <section className="fade-in">

    <div className="flex flex-col lg:flex-row justify-between gap-10 items-start">

      {/* LEFT */}

      <div className="max-w-4xl">

        <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
          FUTURE AI OPERATING SYSTEM
        </div>

        <h1 className="text-5xl lg:text-8xl font-black leading-tight">

          <span className="gradient-text">
            AI
          </span>

          <br />

          ECOSYSTEM
        </h1>

        <p className="text-slate-400 text-lg lg:text-2xl mt-8 leading-relaxed max-w-3xl">

          Autonomous AI infrastructure with
          intelligent agents, workflow automation,
          analytics intelligence, cloud orchestration,
          memory systems, futuristic terminal access,
          and self-scaling revenue engines.

        </p>

        {/* BUTTONS */}

        <div className="flex flex-wrap gap-5 mt-10">

          <Link
            href="/assistant"
            className="
              px-7
              py-4
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition-all
              font-bold
              text-lg
              shadow-lg
              shadow-cyan-500/20
            "
          >
            Launch AI Assistant
          </Link>

          <Link
            href="/terminal"
            className="
              px-7
              py-4
              rounded-2xl
              border
              border-slate-700
              hover:border-cyan-500
              hover:text-cyan-400
              transition-all
              text-lg
            "
          >
            Open Terminal
          </Link>

        </div>

      </div>

      {/* RIGHT STATUS */}

      <div className="glass-card p-8 w-full lg:w-[380px]">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            System Status
          </h2>

          <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />

        </div>

        <div className="mt-8 space-y-5 text-slate-300">

          <div className="flex justify-between">
            <span>AI Core</span>
            <span className="text-green-400">
              ACTIVE
            </span>
          </div>

          <div className="flex justify-between">
            <span>Automation</span>
            <span className="text-cyan-400">
              RUNNING
            </span>
          </div>

          <div className="flex justify-between">
            <span>Cloud Sync</span>
            <span className="text-blue-400">
              CONNECTED
            </span>
          </div>

          <div className="flex justify-between">
            <span>Revenue Engine</span>
            <span className="text-yellow-400">
              ONLINE
            </span>
          </div>

          <div className="flex justify-between">
            <span>Memory AI</span>
            <span className="text-pink-400">
              LEARNING
            </span>
          </div>

        </div>

      </div>

    </div>

  </section>

  {/* STATS */}

  <section className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

    <StatCard
      title="AI Agents"
      value="12"
      subtitle="Active Systems"
    />

    <StatCard
      title="Automation"
      value="128"
      subtitle="Running Tasks"
    />

    <StatCard
      title="Revenue"
      value="$24K"
      subtitle="Monthly Generated"
    />

    <StatCard
      title="Cloud"
      value="99.9%"
      subtitle="Server Uptime"
    />

  </section>

  {/* MODULES */}

  <section className="mt-24">

    <div className="flex items-center justify-between mb-10">

      <div>

        <h2 className="text-4xl lg:text-5xl font-black">
          AI Infrastructure
        </h2>

        <p className="text-slate-400 mt-3">
          Intelligent autonomous modules
        </p>

      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

      <ModuleCard
        title="AI Assistant"
        desc="Advanced conversational intelligence with autonomous task execution."
      />

      <ModuleCard
        title="Automation Engine"
        desc="Self-operating AI workflows for scaling systems automatically."
      />

      <ModuleCard
        title="Analytics AI"
        desc="Real-time analytics, predictions, and optimization intelligence."
      />

      <ModuleCard
        title="Cloud Infrastructure"
        desc="Distributed AI cloud architecture with global scalability."
      />

      <ModuleCard
        title="CEO Command Center"
        desc="Executive-level AI management and control systems."
      />

      <ModuleCard
        title="AI Terminal"
        desc="Direct system access for autonomous deployment and monitoring."
      />

    </div>

  </section>

</div>

);
}

/* STAT CARD */

function StatCard({
title,
value,
subtitle,
}: {
title: string;
value: string;
subtitle: string;
}) {
return (
<div className="glass-card p-7 hover:border-cyan-500 transition-all">

  <p className="text-slate-400 text-sm uppercase tracking-widest">
    {title}
  </p>

  <h2 className="text-5xl font-black mt-4 gradient-text">
    {value}
  </h2>

  <p className="text-slate-500 mt-4">
    {subtitle}
  </p>

</div>

);
}

/* MODULE CARD */

function ModuleCard({
title,
desc,
}: {
title: string;
desc: string;
}) {
return (
<div
className="
glass-card
p-8
hover:scale-[1.02]
hover:border-cyan-500
transition-all
duration-300
"
>

  <h2 className="text-3xl font-bold mb-5">
    {title}
  </h2>

  <p className="text-slate-400 leading-relaxed text-lg">
    {desc}
  </p>

</div>

);
}
