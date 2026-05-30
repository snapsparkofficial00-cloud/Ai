export async function TrendAgent() {
  const topics = [
    { topic: "AI News", score: 95 },
    { topic: "Tech Facts", score: 88 },
    { topic: "Space News", score: 84 },
  ];

  topics.sort((a, b) => b.score - a.score);

  return topics[0];
}
