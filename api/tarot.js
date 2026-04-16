export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const API_KEY = process.env.OPENAI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: '后端未配置 API Key' });

  const { question, cards } = req.body || {};
  
  // 🚨 核心改动点：强制要求 AI 像一个接地气的好闺蜜一样解牌，严禁任何废话！
  const promptContext = `你现在是我最懂塔罗牌的知心闺蜜，说话一针见血但不失温柔。
我现在的疑惑是：“${question}”
我抽到的牌阵情况如下：
${cards.map(c => `- ${c.position}: 抽到了 ${c.cardName}。这代表 ${c.meaning}`).join('\n')}

请你给我一份解牌报告。必须严格遵守以下规则：
1. 【整体结论】：开头第一段必须用加粗的大白话（<p><strong>...</strong></p>），直接正面回答我的问题！不要用“能量”、“连接”等虚词，直接告诉我“大概率没戏”、“很有希望”或“你会成功”。
2. 【拆解原因】：结合我抽到的具体牌，简短指出为什么会是这个结果。如果是测感情，就直接说对方现在怎么想的；如果是测工作，就说哪里有问题。
3. 【行动建议】：最后给出 1-2 条我今天或明天就能照着做的大白话建议。比如“今天别发微信”、“赶紧去投简历”。
4. 【排版要求】：你只能使用基础 HTML 标签排版（<h4>, <p>, <strong>, <ul>, <li>）。绝对禁止输出带有尖括号的普通文本！绝对禁止输出代码块符号（如 \`\`\`html）！绝对不要加任何 <style> 标签。`;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          { "role": "system", "content": "你是一个说话极度直白、接地气、直接给出是或否结论的塔罗师。严格使用干净的 HTML 标签排版。" },
          { "role": "user", "content": promptContext }
        ],
        temperature: 0.7,
        stream: true 
      })
    });

    if (!response.ok) { return res.status(response.status).json({ error: '大模型连接失败' }); }

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
    res.status(500).end(`data: [ERROR] 后端崩溃 ${error.message}\n\n`);
  }
}
