import { taskQueue }
from "../runtime/task-queue";

export async function executorAI(
  tasks: any[]
) {

  const results = [];

  for (const task of tasks) {

    const queued =
      taskQueue.addTask(

        task.agent,

        task.input

      );

    results.push(queued);

  }

  return {

    success: true,

    queued: results,

  };

}
