import { getVipPaymentOrder } from './_vipPaymentRepository.js';

function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const isAllowed = origin && allowed.includes(origin);

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: '只接受 GET 请求' });

  const orderId = String(req.query?.orderId || '').trim();
  if (!orderId) return res.status(400).json({ error: '缺少 orderId' });

  const order = await getVipPaymentOrder(orderId);
  if (!order) return res.status(404).json({ error: '订单不存在' });

  return res.status(200).json({
    orderId: order.orderId,
    status: order.status,
    productType: order.productType,
    amountFen: order.amountFen,
    expiresAt: order.expiresAt,
    paidAt: order.paidAt,
    unlockConsumedAt: order.unlockConsumedAt,
    paymentChannel: order.paymentChannel,
    paymentTxnId: order.paymentTxnId,
    callbackReceivedAt: order.callbackReceivedAt
  });
}
