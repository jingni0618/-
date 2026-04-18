import { createVipPaymentOrder } from './_vipPaymentRepository.js';

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

  const qrUrl = process.env.VIP_QR_IMAGE_URL || 'https://i.postimg.cc/vBRq8rJn/IMG-9022.jpg';
  const productType = String(req.body?.productType || 'deep').trim();
  const amountFen = productType === 'compatibility' ? 500 : 300;

  const order = await createVipPaymentOrder({ amountFen, qrUrl, productType, scene: 'deep-reading' });
  return res.status(200).json({
    orderId: order.orderId,
    status: order.status,
    productType: order.productType,
    amountFen: order.amountFen,
    qrUrl: order.qrUrl,
    expiresAt: order.expiresAt
  });
}
