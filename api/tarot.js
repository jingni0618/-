export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const API_KEY = process.env.OPENAI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: '后端未配置 OPENAI_API_KEY' });

  const { question, cards } = req.body || {};
  if (!question || !cards || !Array.isArray(cards)) return res.status(400).json({ error: '前端数据格式不正确' });

  // 🚨 核心改动点：让 AI 变成一个资深的心理咨询师，给出极度丰富、温暖的千字长文解答。
  const promptContext = `你是一位拥有极高同理心的心理咨询师和塔罗牌解读大师。
你的任务是：根据访客抽到的牌，为TA提供一份深度、丰富、极具情感共鸣的长篇解读。

【访客的问题】：${question}
【抽到的牌阵】：
${cards.map(c => `- ${c.position}: 抽到了 ${c.cardName}。核心含义：${c.meaning}`).join('\n')}

【答题铁律（必须遵守）】：
1. 你的语气必须极度温柔、充满智慧，像一个懂TA的知心朋友，去共情TA在问题里隐藏的焦虑或期待。
2. 篇幅要长，内容要丰满（总字数在 1000 - 1500 字左右）。
3. 详细拆解这几张牌在TA的具体生活场景中意味着什么，彼此之间是如何影响的。
4. 提供的情感建议和行动指南必须贴近现代人的生活，具有极强的可操作性。
5. 必须包含三个明显的部分：🔮 【命运的整体启示】、🌟 【牌面深度故事解析】、✨ 【心灵处方与行动建议】。
6. 直接输出带有基础 HTML 标签（如 <h4>, <p>, <ul>, <strong>）的精美排版。绝对禁止使用 markdown 的 \`\`\`html 代码块！绝对禁止在回答中输出 <style> 或颜色代码。`;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          { "role": "system", "content": "你是一个极具同理心、只输出干净HTML排版的占卜助手。" },
          { "role": "user", "content": promptContext }
        ],
        // 把温度调高一点，让它写出来的文章更感性、更发散、更丰富
        temperature: 0.85,
        // 解除短字数限制，允许它写长文
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = errorText;
      try { errorMsg = JSON.parse(errorText).error?.message || errorText; } catch (e) {}
      return res.status(response.status).json({ error: `DeepSeek 报错: ${errorMsg}` });
    }

    const data = await response.json();
    let readingHtml = data.choices[0].message.content;
    
    // 强制正则剔除它可能带的 style 标签和 markdown
    readingHtml = readingHtml.replace(/```html|```/gi, '').trim();
    readingHtml = readingHtml.replace(/<style[^>]*>.*?<\/style>/gi, '');

    return res.status(200).json({ reading: readingHtml });

  } catch (error) {
    return res.status(500).json({ error: `后端崩溃: ${error.message}` });
  }
}