import { workflowEngine }
from "../runtime/workflow-engine";

import { getLogs }
from "../logs";

export function getAnalytics() {

  const tasks =
    workflowEngine.getTasks();

  const logs =
    getLogs();

  return {

    tasks: {

      total:
        tasks.length,

      completed:
        tasks.filter(
          (t) =>
            t.status ===
            "completed"
        ).length,

      failed:
        tasks.filter(
          (t) =>
            t.status ===
            "failed"
        ).length,

      running:
        tasks.filter(
          (t) =>
            t.status ===
            "running"
        ).length,

    },

    logs:
      logs.length,

    successRate:

      tasks.length > 0

        ? (
            tasks.filter(
              (t) =>
                t.status ===
                "completed"
            ).length

            /

            tasks.length
          ) * 100

        : 0,

  };

}
