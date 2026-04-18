import { consumeVipPaymentUnlock, getVipPaymentOrder } from './_vipPaymentRepository.js';
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

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '只接受 POST 请求' });

  const signingSecret = process.env.VIP_SIGNING_SECRET || process.env.OPENAI_API_KEY;
  if (!signingSecret) {
    return res.status(503).json({ error: 'VIP 验证未配置' });
  }

  const orderId = String(req.body?.orderId || '').trim();
  if (!orderId) return res.status(400).json({ error: '缺少 orderId' });

  const order = await getVipPaymentOrder(orderId);
  if (!order) return res.status(404).json({ error: '订单不存在' });
  if (order.status !== 'paid' && order.status !== 'unlocked') {
    return res.status(402).json({ error: '订单尚未支付完成' });
  }

  await consumeVipPaymentUnlock(orderId);
  const tokenData = createVipToken(signingSecret);
  return res.status(200).json(tokenData);
}
