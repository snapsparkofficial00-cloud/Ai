import { taskQueue }
from "../runtime/task-queue";

import { runTask }
from "../runtime/task-worker";

export async function executorAI(
tasks: any[]
) {

const results = [];

for (const task of tasks) {

console.log(
  "Queueing task:",
  task
);

// Add task to queue
const queued =
  taskQueue.addTask(

    task.agent,

    task.input

  );

results.push({
  queued: true,
  task,
});

// Execute immediately
// (Later you can move this
// to background workers)

try {

  await runTask({

    agent: task.agent,

    input: task.input,

  });

  console.log(
    "Task executed:",
    task.input
  );

} catch (error) {

  console.log(
    "Execution failed:",
    error
  );
}

}

return {

success: true,

queued: results,

total: results.length,

};
}
