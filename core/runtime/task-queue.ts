import { workflowEngine }
from "./workflow-engine";

export interface QueueTask {

  id: string;

  agent: string;

  input: string;

  status:
    | "pending"
    | "running"
    | "completed"
    | "failed";

}

class TaskQueue {

  private queue:
    QueueTask[] = [];

  private running =
    false;

  addTask(
    agent: string,
    input: string
  ) {

    const task: QueueTask = {

      id:
        crypto.randomUUID(),

      agent,

      input,

      status:
        "pending",

    };

    this.queue.push(task);

    this.process();

    return task;

  }

  async process() {

    if (this.running)
      return;

    this.running = true;

    while (
      this.queue.length > 0
    ) {

      const task =
        this.queue[0];

      try {

        task.status =
          "running";

        await workflowEngine.createTask(

          task.agent,

          task.input

        );

        task.status =
          "completed";

      } catch {

        task.status =
          "failed";

      }

      this.queue.shift();

    }

    this.running = false;

  }

  getQueue() {

    return this.queue;

  }

}

export const taskQueue =
  new TaskQueue();
