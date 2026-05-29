// /core/runtime/workflow-engine.ts

import { runAgent }
from "../agents/agent-runner";

import { addLog }
from "../logs";

export interface WorkflowTask {

  id: string;

  agent: string;

  input: string;

  status:
    | "queued"
    | "running"
    | "completed"
    | "failed";

  createdAt: Date;

  startedAt?: Date;

  completedAt?: Date;

  duration?: number;

  error?: any;

}

export class WorkflowEngine {

  private tasks:
    WorkflowTask[] = [];

  async createTask(
    agent: string,
    input: string
  ) {

    const task:
      WorkflowTask = {

      id:
        crypto.randomUUID(),

      agent,

      input,

      status:
        "queued",

      createdAt:
        new Date(),

    };

    this.tasks.push(task);

    return await this.executeTask(
      task
    );
  }

  async executeTask(
    task: WorkflowTask
  ) {

    try {

      addLog(

        task.agent,

        "INFO",

        `Task started:
${task.input}`

      );

      task.status =
        "running";

      task.startedAt =
        new Date();

      const result =
        await runAgent(

          task.agent,

          task.input

        );

      task.status =
        "completed";

      task.completedAt =
        new Date();

      task.duration =

        task.completedAt.getTime()

        -

        task.startedAt.getTime();

      addLog(

        task.agent,

        "SUCCESS",

        "Task completed successfully"

      );

      return {

        success: true,

        task,

        result,

      };

    } catch (error) {

      task.status =
        "failed";

      task.error =
        error;

      addLog(

        task.agent,

        "ERROR",

        "Task failed"

      );

      return {

        success: false,

        error,

      };

    }

  }

  getTasks() {

    return this.tasks;

  }

}

export const workflowEngine =
  new WorkflowEngine();
