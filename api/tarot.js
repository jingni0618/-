// api/tarot.js
export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Vercel 会自动从后台环境变量中读取这个 Key，绝对安全！
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: '服务器未配置 API Key' });
  }

  const { question, cards } = req.body;

  // 组装 Prompt
  const promptContext = `你是一位拥有20年经验的神秘学大师和塔罗牌占卜师。
访客的问题是：“${question}”
抽到的牌阵情况：
${cards.map(c => `- [${c.position}]: ${c.cardName}。基础含义：${c.meaning}`).join('\n')}

请你给出一段富有神秘感、温柔且具启发性的解答。包含：
1. 🔮 【整体启示】：直接回应问题。
2. 🌟 【牌面详细解析】：把 4 张牌串联成一个故事。
3. ✨ 【行动建议】。
要求：使用 HTML 标签排版（如 <h4>, <p>, <ul>），直接输出纯 HTML。`;

  try {
    // 后端去请求 OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { "role": "system", "content": "你是一个塔罗占卜助手，请直接输出纯 HTML 排版文本。" },
          { "role": "user", "content": promptContext }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    // 把解读结果原封不动返回给前端
    res.status(200).json({ reading: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: '向星空祈求启示时发生错误' });
  }
}
