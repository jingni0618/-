import {
  buildNotifyUrl,
  createAlipayPrecreateOrder,
  isAlipayPrecreateConfigured
} from './_alipay.js';
import {
  buildVipOrderId,
  createVipPaymentOrder,
  updateVipPaymentOrderQrUrl
} from './_vipPaymentRepository.js';

function buildQrImageUrl(qrContent = '') {
  const content = String(qrContent || '').trim();
  if (!content) return '';
  return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=12&data=${encodeURIComponent(content)}`;
}

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

  const productType = String(req.body?.productType || 'deep').trim();
  const amountFen = productType === 'compatibility' ? 500 : 300;
  const orderId = buildVipOrderId();
  const fallbackQrUrl = String(process.env.VIP_ALIPAY_QR_IMAGE_URL || '').trim();
  let qrUrl = fallbackQrUrl;
  let qrContent = '';
  let paymentMode = 'static_qr';
  let precreateTradeNo = '';
  let precreateError = '';

  if (!qrUrl && !isAlipayPrecreateConfigured()) {
    return res.status(503).json({ error: '支付宝预创建订单或 VIP_ALIPAY_QR_IMAGE_URL 未配置' });
  }

  const initialOrder = await createVipPaymentOrder({ orderId, amountFen, qrUrl, productType, scene: 'deep-reading' });

  if (isAlipayPrecreateConfigured()) {
    try {
      const subject = productType === 'compatibility' ? '塔罗之眼双人合盘' : '塔罗之眼进阶解牌';
      const alipayOrder = await createAlipayPrecreateOrder({
        orderId,
        amountFen,
        subject,
        notifyUrl: buildNotifyUrl(req)
      });
      qrContent = alipayOrder.qrUrl;
      qrUrl = buildQrImageUrl(qrContent);
      paymentMode = 'alipay_precreate';
      precreateTradeNo = alipayOrder.tradeNo;
      await updateVipPaymentOrderQrUrl(orderId, qrUrl);
    } catch (error) {
      precreateError = error.message || '支付宝预创建订单失败';
      if (!fallbackQrUrl) {
        return res.status(503).json({ error: precreateError });
      }
      qrUrl = fallbackQrUrl;
      paymentMode = 'static_qr';
    }
  }

  return res.status(200).json({
    orderId: initialOrder.orderId,
    status: initialOrder.status,
    productType: initialOrder.productType,
    amountFen: initialOrder.amountFen,
    qrUrl,
    qrContent,
    expiresAt: initialOrder.expiresAt,
    paymentMode,
    precreateTradeNo,
    precreateError
  });
}
