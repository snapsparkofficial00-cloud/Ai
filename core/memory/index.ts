type MemoryItem = {

  id: string;

  agent: string;

  task: string;

  response: string;

  createdAt: string;

};

const memoryStore:
MemoryItem[] = [];

export const MemoryAI = {

  name: "Memory AI",

  description:
    "Stores AI memories and successful workflows",

  save(
    agent: string,
    task: string,
    response: string
  ) {

    const item = {

      id:
        crypto.randomUUID(),

      agent,

      task,

      response,

      createdAt:
        new Date().toISOString(),

    };

    memoryStore.push(item);

    console.log(
      "🧠 MEMORY SAVED:",
      item
    );

    return item;

  },

  getAll() {

    return memoryStore;

  },

  search(query: string) {

    return memoryStore.filter(
      (m) =>

        m.task
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||

        m.response
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
    );

  },

};
