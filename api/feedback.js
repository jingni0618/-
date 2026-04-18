function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const isAllowed = origin && allowed.includes(origin);

  if (isAllowed) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "只接受 POST 请求" });

  const { name, email, contact, message, page, createdAt } = req.body || {};
  const mergedContact = contact || email || "未填写";
  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "意见内容不能为空" });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.FEEDBACK_TO_EMAIL || "jingni18@hotmail.com";
  const fromEmail = process.env.FEEDBACK_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendKey) {
    return res.status(503).json({ error: "RESEND_API_KEY 未配置" });
  }

  const html = `
    <h2>新的用户意见反馈</h2>
    <p><strong>称呼：</strong>${String(name || "匿名用户")}</p>
    <p><strong>联系方式：</strong>${String(mergedContact)}</p>
    <p><strong>提交时间：</strong>${String(createdAt || new Date().toISOString())}</p>
    <p><strong>来源页面：</strong>${String(page || "未知")}</p>
    <hr />
    <p><strong>意见内容：</strong></p>
    <pre style="white-space: pre-wrap; line-height: 1.6;">${String(message)}</pre>
  `;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: "[命运星盘] 新的用户意见",
        html
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: `邮件发送失败: ${text}` });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: `发送异常: ${err.message}` });
  }
}
