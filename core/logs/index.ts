type LogType =
  | "INFO"
  | "SUCCESS"
  | "ERROR";

export interface AgentLog {

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

    time: new Date(),

    agent,

    type,

    message,

  });

}

export function getLogs() {

  return logs;

}
