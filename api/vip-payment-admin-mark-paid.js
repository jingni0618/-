import { markVipPaymentPaid } from './_vipPaymentRepository.js';

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

  const adminKey = process.env.VIP_ADMIN_KEY;
  if (!adminKey) return res.status(503).json({ error: 'VIP_ADMIN_KEY 未配置' });

  const provided = String(req.body?.adminKey || '').trim();
  if (!provided || provided !== adminKey) {
    return res.status(401).json({ error: '管理密钥错误' });
  }

  const orderId = String(req.body?.orderId || '').trim();
  if (!orderId) return res.status(400).json({ error: '缺少 orderId' });

  const order = await markVipPaymentPaid(orderId, 'admin');
  if (!order) return res.status(404).json({ error: '订单不存在' });

  return res.status(200).json({ orderId: order.orderId, status: order.status, paidAt: order.paidAt });
}
