import { createVipToken } from './_vipToken.js';

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

function getAllowedCodes() {
  const raw = process.env.VIP_FRIEND_TEST_CODES || 'FRIEND,FRIENDS,Friends';
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const signingSecret = process.env.VIP_SIGNING_SECRET || process.env.OPENAI_API_KEY;
  if (!signingSecret) {
    return res.status(503).json({ error: 'VIP 验证未配置' });
  }

  const code = String(req.body?.code || '').trim();
  if (!code) return res.status(400).json({ error: '缺少测试码' });

  const allowedCodes = getAllowedCodes();
  if (!allowedCodes.some(item => item.toUpperCase() === code.toUpperCase())) {
    return res.status(401).json({ error: '测试码无效' });
  }

  const tokenData = createVipToken(signingSecret);
  return res.status(200).json({
    ...tokenData,
    source: 'friend-test-code'
  });
}
