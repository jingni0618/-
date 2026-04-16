export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const API_KEY = process.env.OPENAI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: '后端未配置 API Key' });

  const { question, cards, readingStyle, soulCard, isDaily, isNight } = req.body || {};
  
  let promptContext = "";
  let systemRole = "";

  const soulCall = soulCard ? `访客的灵魂本命牌是【${soulCard.name}】，请结合此灵魂底色进行深度共情。` : "";

  if (isDaily) {
    systemRole = "你是一位极具诗意的占星诗人。";
    promptContext = `今天抽到的日签是【${cards[0].cardName}】(核心含义:${cards[0].meaning})。
写一段60字内的绝美散文诗作为今日箴言。不要解释牌意，直接输出文字。`;
  } else {
    // [Func-1] 动态切换人设
    let styleDesc = "";
    if (readingStyle === "harsh") styleDesc = "你是一位被称为“毒舌导师”的塔罗师，极其犀利、一针见血，专治矫情和恋爱脑，语言像刀子一样剖析人性的阴暗面和现实的残酷。";
    else if (readingStyle === "healing") styleDesc = "你是一位极度温柔的“星空疗愈师”，充满神圣的母性光辉。你的话语像春风一样温暖，给受伤的灵魂提供巨大的情绪价值与安慰。";
    else styleDesc = "你是一位经验丰富、客观睿智的经典韦特塔罗大师，中正平和，娓娓道来。";

    if (isNight) styleDesc += " 此时正值深夜，你可以适当加入一些安抚失眠、放下执念的话语。";
    
    systemRole = styleDesc + "你必须输出 1000 - 1500 字的深度解析。";
    
    promptContext = `${soulCall}
TA的疑惑：“${question}”
抽到的牌：
${cards.map(c => `- ${c.position}: ${c.cardName}。含义：${c.meaning}`).join('\n')}

你的解盘必须严格遵守以下结构和 HTML 排版：
1. 开头必须强制提取3个关键词，格式为：<div class="reading-keywords">【命运箴言】：词1 | 词2 | 词3</div>
2. <h4>🔮 命运总览</h4>：用一句充满哲理的金句定调，并清晰直接地回答TA的问题（是/否/吉/凶）。
3. <h4>🌟 灵魂拆解</h4>：将这几张牌的内在逻辑交织在一起讲故事。过去埋下什么因？现在卡在哪里？
4. <h4>💡 破局之眼</h4>：挑出最关键的一张牌，点破死穴或转机。
5. <h4>✨ 凡尘指南</h4>：给出3条极度具体的现实行动建议。

绝对禁止输出 markdown 的 \`\`\`html，不要 <style> 标签！`;
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
    if (isDaily) { const data = await response.json(); return res.status(200).json({ reading: data.choices[0].message.content }); }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const reader = response.body.getReader(); const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      const chunk = decoder.decode(value, { stream: true }); res.write(chunk);
    }
    res.end();
  } catch (error) {
    if(!isDaily) res.status(500).end(`data: [ERROR] 后端崩溃 ${error.message}\n\n`);
    else res.status(500).json({ error: error.message });
  }
}