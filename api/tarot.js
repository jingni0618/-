import crypto from 'node:crypto';

function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const isAllowed = origin && allowed.includes(origin);

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function verifyVipToken(token, secret) {
  if (!token || !secret) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const payloadB64 = parts[0];
  const signature = parts[1];
  const expected = crypto.createHmac('sha256', secret).update(payloadB64).digest('hex');
  if (signature !== expected) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (!payload?.exp) return false;
    return Date.now() < payload.exp;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const API_KEY = process.env.OPENAI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: '后端未配置 API Key' });

  const { question, cards, soulCard, isDaily, isNight, vipToken, fallbackShort, userName, partnerName, emotionLevel, emotionLabel, isCompatibility } = req.body || {};
  const safeCards = Array.isArray(cards) ? cards : [];
  const vipUnlockCode = process.env.VIP_UNLOCK_CODE;
  const vipSigningSecret = process.env.VIP_SIGNING_SECRET || API_KEY;

  if (!isDaily && safeCards.length > 3 && vipUnlockCode) {
    const ok = verifyVipToken(vipToken, vipSigningSecret);
    if (!ok) {
      return res.status(402).json({ error: '高级牌阵需要VIP解锁验证' });
    }
  }
  
  let promptContext = "";
  let systemRole = "";

  const soulCall = soulCard ? `访客的本命牌是【${soulCard.name}】，请在文中提到这一点并结合分析。` : "";

  // 模式 A：朋友圈日签模式
  if (isDaily) {
    systemRole = "你是一位极具诗意和疗愈感的占星诗人。";
    const dailyCard = safeCards[0] || {};
    const dailyCardName = dailyCard.cardName || dailyCard.name || "未知之牌";
    const dailyCardMeaning = dailyCard.meaning || "未知含义";
    promptContext = `今天抽到的日签是【${dailyCardName}】(核心含义:${dailyCardMeaning})。
写一段 60 字左右的绝美散文诗作为今日箴言。不要解释牌意，直接输出文字，不带任何标签。`;
  } 
  // 模式 B：超长专业解盘模式（动态流派）
  else {
    let styleDesc = "你是一位经验丰富、客观睿智的经典韦特塔罗大师，中正平和，娓娓道来。";

    if (isNight) styleDesc += " 此时正值深夜，你的语气要变得极度轻柔、催眠，安抚深夜容易焦虑的灵魂。";
    
    systemRole = styleDesc + (fallbackShort ? " 你需要输出 250 - 450 字的简版解析。" : " 你必须输出 1000 - 1500 字的深度解析。");
    
    const identityLine = userName ? `提问者昵称：${userName}` : "提问者昵称：匿名旅人";
    const compatibilityLine = isCompatibility && partnerName
      ? `这是双人合盘问题，对方昵称：${partnerName}。请分析双方互动模式、误解来源与可执行沟通建议。`
      : "这是单人问题，聚焦提问者自身成长与决策。";
    const emotionLine = `当前情绪雷达：等级 ${Number(emotionLevel || 3)}（${emotionLabel || "平静观察"}）。请在语气与建议力度中体现这个状态。`;

    promptContext = `${soulCall}
${identityLine}
${compatibilityLine}
${emotionLine}
TA的疑惑：“${question}”
抽到的阵法：
${safeCards.map(c => `- ${c.position}: 抽到 ${c.cardName}。含义：${c.meaning}`).join('\n')}

你的解盘必须严格遵守以下结构：
1. 先提取3个关键词：**【命运箴言】**：词1 | 词2 | 词3
2. 然后用 Markdown 引用写2-3句核心结论：
> 问题的答案 + 关键转折点 + 最该做的一件事。
3. #### 🔮 神谕总览
用一句充满哲理的金句定调，并清晰直接地回答TA的问题（是/否/吉/凶）。
4. #### 🌟 灵魂拆解
将这几张牌的内在逻辑交织在一起讲故事。过去埋下什么因？现在卡在哪里？
5. #### 💡 破局之眼
挑出最关键的一张牌，点破死穴或转机。
6. #### ✨ 凡尘指南
给出3条极度具体的现实行动建议。

排版铁律：
1. 全部使用纯 Markdown 格式：#### 做标题，> 做引用，**加粗**，- 列表。
2. 绝对禁止使用任何 HTML 标签（包括 div, h4, p, span, style 等）。
3. 绝对禁止使用 markdown 代码块。`;
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          { "role": "system", "content": systemRole || "你是一个严格遵守排版规则的高级占卜助手。" },
          { "role": "user", "content": promptContext }
        ],
        temperature: isDaily ? 0.9 : 0.8,
        max_tokens: isDaily ? 150 : (fallbackShort ? 900 : 2500),
        stream: !isDaily && !fallbackShort
      })
    });

    if (!response.ok) return res.status(response.status).json({ error: '大模型连接失败' });

    if (isDaily || fallbackShort) {
      const data = await response.json();
      return res.status(200).json({ reading: data.choices[0].message.content });
    }

    // 长文流式下发
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