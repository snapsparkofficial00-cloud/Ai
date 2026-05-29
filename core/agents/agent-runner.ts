// /core/agents/agent-runner.ts

export async function runAgent(
  agent: string,
  input: string
) {
  switch (agent) {
    case "youtube":
      return `YouTube AI processed: ${input}`;

    case "website":
      return `Website AI built: ${input}`;

    case "revenue":
      return `Revenue AI analyzed: ${input}`;

    default:
      return `Unknown agent`;
  }
}
