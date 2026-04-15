// 注意：Vercel Serverless Functions 中，这里不需要包含顶部的任何 import 语句。
// 直接导出一个默认函数即可。

export default async function handler(req, res) {
  // 1. 允许跨域（解决浏览器拦截问题）
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只接受 POST 请求' });
  }

  // 3. 读取 Vercel 后台配置的 API Key
  const API_KEY = process.env.OPENAI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: '后端服务器未配置 OPENAI_API_KEY 环境变量' });
  }

  // 4. 解析前端传来的数据
  const { question, cards } = req.body || {};
  if (!question || !cards || !Array.isArray(cards)) {
    return res.status(400).json({ error: '前端传来的数据格式不正确（缺少问题或牌阵数组）' });
  }

  // 5. 组装给 DeepSeek 的提示词 (Prompt)
  const promptContext = `你是一位拥有20年经验的神秘学大师和塔罗牌占卜师。
访客的问题是：“${question}”
抽到的牌阵情况：
${cards.map(c => `- [${c.position}]: 抽到了 ${c.cardName}。基础含义：${c.meaning}`).join('\n')}

请你给出一段富有神秘感、温柔且具启发性的解答。包含：
1. 🔮 【整体启示】：直接回应问题。
2. 🌟 【牌面详细解析】：把 4 张牌串联成一个故事。
3. ✨ 【行动建议】。
要求：使用 HTML 标签排版（如 <h4>, <p>, <ul>），直接输出纯 HTML（不要包含 markdown 代码块如 \`\`\`html）。`;

  try {
    // 6. 发起真实的 DeepSeek 请求
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          { "role": "system", "content": "你是一个塔罗占卜助手，请直接输出纯 HTML 排版文本。" },
          { "role": "user", "content": promptContext }
        ],
        temperature: 0.7
      })
    });

    // 7. 处理 DeepSeek 报错
    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = errorText;
      try {
          const errObj = JSON.parse(errorText);
          errorMsg = errObj.error?.message || JSON.stringify(errObj);
      } catch (e) {}
      
      return res.status(response.status).json({ 
        error: `DeepSeek 接口报错: ${errorMsg}` 
      });
    }

    // 8. 成功！返回解析结果给前端
    const data = await response.json();
    const readingHtml = data.choices[0].message.content;
    
    // 简单清理大模型可能带上的 markdown 格式
    const cleanHtml = readingHtml.replace(/```html|```/gi, '').trim();

    return res.status(200).json({ reading: cleanHtml });

  } catch (error) {
    // 捕获网络层面的崩溃错误
    return res.status(500).json({ error: `Node.js 后端执行崩溃: ${error.message}` });
  }
}