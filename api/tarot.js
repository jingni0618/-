export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const API_KEY = process.env.OPENAI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: '后端未配置 API Key' });

  const { question, cards, userName, soulCard, isDaily } = req.body || {};
  
  let promptContext = "";
  let systemRole = "";

  const nameCall = userName ? `访客的名字叫“${userName}”。` : "";
  const soulCall = soulCard ? `TA的本命灵魂牌是【${soulCard.name}】，请在解盘时将这个灵魂底色融入进去。` : "";

  if (isDaily) {
    systemRole = "你是一位极具诗意和疗愈感的占星诗人。";
    promptContext = `今天抽到的日签是【${cards[0].cardName}】(核心含义:${cards[0].meaning})。
写一段 60 字左右的唯美散文诗作为今天的“护身符箴言”。不解释牌意，直接输出文字，不带任何排版标签。`;
  } else {
    systemRole = "你是一位极具同理心、深谙人性的顶尖塔罗大师。必须输出 1000 字左右的深度解析。";
    
    promptContext = `${nameCall}${soulCall}
TA的疑惑：“${question}”
抽到的阵法：
${cards.map(c => `- ${c.position}: 抽到 ${c.cardName}。含义：${c.meaning}`).join('\n')}

你的解盘必须严格包含以下 4 个结构，用 <h4> 标签作为标题：
1. 🔮 【神谕总览】：用充满哲理的话定调，并清晰直接地回答TA的问题结果。
2. 🌟 【灵魂拆解】：将这几张牌串联成生动的故事，深挖对方心理和事情本质。
3. 💡 【破局之眼】：指出最关键的一张牌，点破死穴或转机。
4. ✨ 【凡尘指南】：给出3条接地气的具体行动建议和心理建设。

排版铁律：
1. 必须使用干净的 HTML 标签排版（<h4>, <p>, <strong>, <ul>）。
2. 绝对禁止输出 markdown 的 \`\`\`html！绝对禁止 <style> 标签。`;
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          { "role": "system", "content": systemRole },
          { "role": "user", "content": promptContext }
        ],
        temperature: isDaily ? 0.9 : 0.8,
        max_tokens: isDaily ? 150 : 2500,
        stream: !isDaily 
      })
    });

    if (!response.ok) return res.status(response.status).json({ error: '大模型连接失败' });

    if (isDaily) {
      const data = await response.json();
      return res.status(200).json({ reading: data.choices[0].message.content });
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }
    res.end();

  } catch (error) {
    if(!isDaily) res.status(500).end(`data: [ERROR] 后端崩溃 ${error.message}\n\n`);
    else res.status(500).json({ error: error.message });
  }
}
