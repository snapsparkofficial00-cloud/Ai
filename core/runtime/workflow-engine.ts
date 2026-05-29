// /core/runtime/workflow-engine.ts

import { runAgent } from "../agents/agent-runner";

export interface WorkflowTask {
  id: string;
  agent: string;
  input: string;
  status: "queued" | "running" | "completed" | "failed";
}

export class WorkflowEngine {
  private tasks: WorkflowTask[] = [];

  async createTask(agent: string, input: string) {
    const task: WorkflowTask = {
      id: crypto.randomUUID(),
      agent,
      input,
      status: "queued",
    };

    this.tasks.push(task);

    return await this.executeTask(task);
  }

  async executeTask(task: WorkflowTask) {
    try {
      task.status = "running";

      const result = await runAgent(
        task.agent,
        task.input
      );

      task.status = "completed";

      return {
        success: true,
        task,
        result,
      };
    } catch (error) {
      task.status = "failed";

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
