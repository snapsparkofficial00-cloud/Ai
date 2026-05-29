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

  result?: any;

  error?: any;

}

export class WorkflowEngine {

  private tasks:
    WorkflowTask[] = [];

  /* =========================
     CREATE TASK
  ========================== */

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

    this.tasks.unshift(task);

    addLog(
      agent,
      "INFO",
      `Task queued`
    );

    return await this.executeTask(
      task
    );
  }

  /* =========================
     EXECUTE TASK
  ========================== */

  async executeTask(
    task: WorkflowTask
  ) {

    try {

      task.status =
        "running";

      task.startedAt =
        new Date();

      addLog(

        task.agent,

        "INFO",

        `Task started:
${task.input}`

      );

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

      task.result =
        result;

      addLog(

        task.agent,

        "SUCCESS",

        `Task completed in
${task.duration}ms`

      );

      return {

        success: true,

        task,

        result,

      };

    } catch (error: any) {

      task.status =
        "failed";

      task.error =
        error?.message ||
        "Unknown error";

      task.completedAt =
        new Date();

      addLog(

        task.agent,

        "ERROR",

        `Task failed:
${task.error}`

      );

      return {

        success: false,

        error,

      };

    }

  }

  /* =========================
     GET TASKS
  ========================== */

  getTasks() {

    return this.tasks;

  }

  /* =========================
     GET STATS
  ========================== */

  getStats() {

    return {

      total:
        this.tasks.length,

      running:
        this.tasks.filter(
          (t) =>
            t.status ===
            "running"
        ).length,

      completed:
        this.tasks.filter(
          (t) =>
            t.status ===
            "completed"
        ).length,

      failed:
        this.tasks.filter(
          (t) =>
            t.status ===
            "failed"
        ).length,

      queued:
        this.tasks.filter(
          (t) =>
            t.status ===
            "queued"
        ).length,

    };

  }

  /* =========================
     CLEAR TASKS
  ========================== */

  clearTasks() {

    this.tasks = [];

    addLog(
      "system",
      "INFO",
      "Workflow tasks cleared"
    );

  }

}

export const workflowEngine =
  new WorkflowEngine();
