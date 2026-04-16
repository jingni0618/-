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
  
  const promptContext = `你是一位拥有极高同理心的心理咨询师和塔罗牌解读大师。
访客的问题是：“${question}”
抽到的牌阵情况：
${cards.map(c => `- ${c.position}: ${c.cardName}。核心含义：${c.meaning}`).join('\n')}

请给出一段富有神秘感、温柔的长篇解读。包含：
1. 🔮 【命运的启示】：直接回应问题。
2. 🌟 【牌面深度解析】：把牌串联成故事。
3. ✨ 【行动建议】。
要求：使用基础 HTML 标签排版（如 <h4>, <p>, <strong>）。绝对禁止输出 markdown 代码块和 <style> 标签。`;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          { "role": "system", "content": "你是一个极具同理心、只输出干净HTML的塔罗助手。" },
          { "role": "user", "content": promptContext }
        ],
        temperature: 0.8,
        stream: true // 开启流式传输！
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'DeepSeek 接口报错' });
    }

    // 设置响应头为流式数据
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 将大模型的水管直接接到客户端的水管上
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
