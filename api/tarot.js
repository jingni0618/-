export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const API_KEY = process.env.OPENAI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: '后端未配置 API Key' });

  const { question, cards, userName, isDaily, isNight } = req.body || {};
  
  let promptContext = "";
  let systemRole = "";

  const nameCall = userName ? `访客的名字叫“${userName}”，请在文中像知心大姐姐一样自然地称呼TA。` : "称呼访客为亲爱的朋友。";

  // 模式 A：朋友圈日签模式（极短、唯美）
  if (isDaily) {
    systemRole = "你是一位极具诗意和疗愈感的占星诗人。";
    promptContext = `今天抽到的日签是【${cards[0].cardName}】(核心含义:${cards[0].meaning})。
请你根据这张牌，写一段大约 60-80 字的极其唯美、充满力量的散文诗作为今天的“护身符箴言”。
绝对不要解释牌意，直接输出这段诗意的话。绝对不要任何排版标签。`;
  } 
  // 模式 B：超长专业解盘模式（流式输出）
  else {
    const tone = isNight 
      ? "现在是深夜，你的语气要变得极度轻柔、催眠、带有深深的疗愈感和包容，像是在深夜电台里安抚容易焦虑的灵魂。" 
      : "你是一位极具同理心、说话极其直白、从业二十年的塔罗大师。";
    
    systemRole = tone + "你必须输出篇幅在 1000 - 1500 字的深度大白话解析。";
    
    promptContext = `${nameCall}
TA的疑惑：“${question}”
抽到的阵法：
${cards.map(c => `- ${c.position}: 抽到 ${c.cardName}。含义：${c.meaning}`).join('\n')}

你的解盘必须严格包含以下 4 个结构模块，用 <h4> 标签作为标题：
1. 🔮 【命运总览】：用一句充满哲理的金句定下基调，然后不要废话，一针见血地直接回答TA的问题（是/否/吉/凶/没戏/有戏）。
2. 🌟 【灵魂拆解】：不要单调地报菜名！将这几张牌的内在逻辑交织在一起，像看电影一样讲出TA身上正在发生的故事。过去埋下了什么因？现在卡在哪里？对方真正的潜台词是什么？
3. 💡 【破局之眼】：在这几张牌中挑出最关键的一张，极其深刻地指出问题的死穴所在。
4. ✨ 【凡尘指南】：给出 3 条极度具体的现实行动建议。第一条关于心态，第二条关于明天该怎么做，第三条是送给TA的心理护身符。

排版铁律：
1. 必须长篇大论，把话说透。
2. 严格使用 HTML 标签排版（<h4>, <p>, <strong>, <ul>）。
3. 绝对禁止输出 markdown 的 \`\`\`html！绝对禁止输出 <style> 标签或颜色代码！`;
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
        temperature: isDaily ? 0.9 : 0.85,
        max_tokens: isDaily ? 150 : 2500,
        stream: !isDaily // 日签直接拿结果，长文用水管流式
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
