export type LogType =
  | "INFO"
  | "SUCCESS"
  | "ERROR";

export interface AgentLog {

  id: string;

  time: Date;

  agent: string;

  type: LogType;

  message: string;

}

const logs: AgentLog[] = [];

export function addLog(
  agent: string,
  type: LogType,
  message: string
) {

  logs.unshift({

    id:
      crypto.randomUUID(),

    time:
      new Date(),

    agent,

    type,

    message,

  });

}

export function getLogs() {

  return logs;

}

export function clearLogs() {

  logs.length = 0;

}
