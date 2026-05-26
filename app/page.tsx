export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-10">

      <h1 className="text-6xl font-black">
        🚀 FUTURE AI ECOSYSTEM
      </h1>

      <p className="text-slate-400 text-2xl mt-8 max-w-4xl leading-10">
        Autonomous AI infrastructure with futuristic
        automation systems, AI agents, cloud intelligence,
        analytics monitoring, terminal control, and
        advanced CEO dashboard systems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <h2 className="text-3xl font-bold">
            🤖 AI Agents
          </h2>

          <p className="text-cyan-400 text-5xl font-black mt-6">
            12
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <h2 className="text-3xl font-bold">
            ⚡ Automation
          </h2>

          <p className="text-green-400 text-5xl font-black mt-6">
            128
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <h2 className="text-3xl font-bold">
            ☁️ Cloud
          </h2>

          <p className="text-blue-400 text-5xl font-black mt-6">
            ACTIVE
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <h2 className="text-3xl font-bold">
            🧠 CEO AI
          </h2>

          <p className="text-purple-400 text-5xl font-black mt-6">
            ONLINE
          </p>
        </div>

      </div>

    </div>
  );
}
