import { addHistoryRecord } from './history.js';
import { updateStatus } from './ui.js';

export async function fetchReading(question, style, userName, cards, soulCard, isNight) {
  const streamContent = document.getElementById("streamContent");
  const cursor = document.getElementById("cursor");
  const aiStatus = document.getElementById("aiStatus");
  streamContent.innerHTML = "";
  let htmlBuffer = "";
  if(aiStatus) aiStatus.style.display = "flex";

  try {
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

    if (!response.ok) throw new Error("宇宙网关拥堵，请稍后重试");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.includes('[DONE]')) continue;
        if (line.startsWith('data: ')) {
          try {
            const dataStr = line.replace('data: ', '');
            if(dataStr.startsWith('[ERROR]')) {
              streamContent.innerHTML += `<br><span style="color:#ff6b6b">${dataStr}</span>`;
              continue;
            }
            const data = JSON.parse(dataStr);
            const content = data.choices?.[0]?.delta?.content || "";
            htmlBuffer += content;
            streamContent.innerHTML = htmlBuffer.replace(/```html/gi, '').replace(/```/g, '');
            if (cursor) cursor.style.display = "inline-block";
          } catch (e) {
            console.error("流数据解析失败", e);
          }
        }
      }
    }

    // ... (记录历史的逻辑)

  } catch (error) {
    streamContent.innerHTML = `<span style="color:#ff6b6b">🔮 宇宙连接中断: ${error.message}</span>`;
    updateStatus("连接异常，请稍后重试。");
  } finally {
    if(cursor) cursor.style.display = "none";
    if(aiStatus) aiStatus.style.display = "none";
    const actionBtns = document.getElementById("actionBtns");
    if(actionBtns) actionBtns.style.display = "flex";
    updateStatus("解读已生成，查看你的命运报告。你也可以复制或保存结果。");
  }
}
