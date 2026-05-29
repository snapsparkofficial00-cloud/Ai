type AgentMessage = {
  from: string;
  to: string;
  message: string;
  timestamp: Date;
};

class AgentBus {

  private messages: AgentMessage[] = [];

  send(
    from: string,
    to: string,
    message: string
  ) {

    const payload: AgentMessage = {

      from,
      to,
      message,
      timestamp: new Date(),

    };

    this.messages.unshift(payload);

    console.log(
      `[BUS]
${from} -> ${to}:
${message}`
    );

    return payload;

  }

  getMessages() {

    return this.messages;

  }

  clear() {

    this.messages = [];

  }

}

export const agentBus =
  new AgentBus();
