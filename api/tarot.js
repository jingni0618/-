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

  // 🚨 核心改动点：彻底改写大模型的人设！要求大白话、直接、简短！
  const promptContext = `你是一位像知心大姐姐一样的现代塔罗牌占卜师。
你的任务是：根据访客抽到的牌，用最接地气的“大白话”为TA解答生活中的困惑。

【访客的问题】：${question}
【抽到的牌阵】：
${cards.map(c => `- ${c.position}: 抽到了 ${c.cardName}。核心含义：${c.meaning}`).join('\n')}

【答题铁律（必须遵守）】：
1. 绝对不要用深奥的玄学词汇（如“灵性显化”、“星体能量”、“因果业力”等），像朋友聊天一样说话。
2. 结合TA提出的具体问题，把这几张牌连起来讲一个简单易懂的道理。
3. 结尾必须给出一个非常具体、明天就能照着做的“行动建议”。
4. 语言要凝练，越精简越好（减少生成时间）。
5. 直接输出带有基础 HTML 标签（如 <p>, <strong>, <ul>, <h4>）的排版，【绝对禁止】在回答中包含 <style> 标签和颜色代码，【绝对禁止】输出 \`\`\`html 代码块！`;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          { "role": "system", "content": "你是一个直白、接地气、只输出干净HTML排版的占卜助手。" },
          { "role": "user", "content": promptContext }
        ],
        // 把温度调低一点，让它少发散、少说废话，速度会更快
        temperature: 0.6,
        // 限制最大回答长度，防止它啰嗦半天导致等待过长
        max_tokens: 600
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