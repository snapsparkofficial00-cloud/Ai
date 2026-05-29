"use client";

import { useEffect, useState }
from "react";

export default function Dashboard() {

  const [system, setSystem] =
    useState<any>(null);

  const [workflow, setWorkflow] =
    useState<any>(null);

  const [logs, setLogs] =
    useState<any>(null);

  async function loadData() {

    const systemRes =
      await fetch("/api/system");

    const workflowRes =
      await fetch("/api/workflow");

    const logsRes =
      await fetch("/api/logs");

    const systemData =
      await systemRes.json();

    const workflowData =
      await workflowRes.json();

    const logsData =
      await logsRes.json();

    setSystem(systemData);

    setWorkflow(workflowData);

    setLogs(logsData);

  }

  useEffect(() => {

    loadData();

    const interval =
      setInterval(loadData, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <main className="p-8">

      <h1 className="text-4xl font-bold">

        👑 AI OS Dashboard

      </h1>

      {/* SYSTEM */}

      <div className="mt-8 border p-4 rounded">

        <h2 className="text-2xl font-bold">

          System Status

        </h2>

        <pre>
          {JSON.stringify(
            system,
            null,
            2
          )}
        </pre>

      </div>

      {/* WORKFLOW */}

      <div className="mt-8 border p-4 rounded">

        <h2 className="text-2xl font-bold">

          Workflow Tasks

        </h2>

        <pre>
          {JSON.stringify(
            workflow,
            null,
            2
          )}
        </pre>

      </div>

      {/* LOGS */}

      <div className="mt-8 border p-4 rounded">

        <h2 className="text-2xl font-bold">

          Runtime Logs

        </h2>

        <pre>
          {JSON.stringify(
            logs,
            null,
            2
          )}
        </pre>

      </div>

    </main>

  );

}
