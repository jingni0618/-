export async function fetchReading(question, style, userName, cards, soulCard, isNight) {
  const response = await fetch("/api/tarot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      cards,
      readingStyle: style,
      userName,
      soulCard,
      isNight
    })
  });

  if (!response.ok) {
    throw new Error("宇宙网关拥堵，请稍后重试");
  }

  if (!response.body) {
    throw new Error("响应流为空");
  }

  return response.body;
}
