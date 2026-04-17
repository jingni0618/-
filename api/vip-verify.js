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

function createVipToken(secret) {
  const exp = Date.now() + 24 * 60 * 60 * 1000;
  const payload = { exp, scope: 'vip-unlock' };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('hex');
  return { token: `${payloadB64}.${signature}`, expiresAt: exp };
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const unlockCode = process.env.VIP_UNLOCK_CODE;
  const signingSecret = process.env.VIP_SIGNING_SECRET || process.env.OPENAI_API_KEY;

  if (!unlockCode || !signingSecret) {
    return res.status(503).json({ error: 'VIP 验证未配置' });
  }

  const body = req.body || {};
  if ((body.unlockCode || '').trim() !== unlockCode) {
    return res.status(401).json({ error: '口令错误' });
  }

  const tokenData = createVipToken(signingSecret);
  return res.status(200).json(tokenData);
}
