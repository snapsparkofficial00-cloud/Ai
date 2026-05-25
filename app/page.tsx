export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        CEO AI Dashboard
      </h1>

      <div className="grid gap-4">

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            CEO AI Status
          </h2>

          <p>System Online</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            Active Divisions
          </h2>

          <ul className="list-disc ml-6">
            <li>Media Division</li>
            <li>Development Division</li>
            <li>Research Division</li>
            <li>Finance Division</li>
          </ul>
        </div>

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            Strategic Intelligence
          </h2>

          <p>
            AI monitoring future business opportunities...
          </p>
        </div>

      </div>
    </main>
  );
}
