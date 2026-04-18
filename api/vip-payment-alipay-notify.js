import crypto from 'node:crypto';
import {
  hasVipPaymentEventTransaction,
  markVipPaymentPaidByCallback,
  saveVipPaymentEvent
} from './_vipPaymentRepository.js';

export const config = {
  api: {
    bodyParser: false
  }
};

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

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

function parseFormBody(rawBody) {
  const params = new URLSearchParams(rawBody || '');
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

function verifyAlipaySignature(payload) {
  const publicKey = String(process.env.ALIPAY_PUBLIC_KEY || '').trim();
  if (!publicKey) {
    throw new Error('ALIPAY_PUBLIC_KEY 未配置');
  }

  const sign = String(payload.sign || '').trim();
  const signType = String(payload.sign_type || 'RSA2').trim().toUpperCase();
  if (!sign) return { ok: false, reason: '缺少 sign' };
  if (signType !== 'RSA2') return { ok: false, reason: '仅支持 RSA2' };

  const sortedKeys = Object.keys(payload)
    .filter(k => k !== 'sign' && k !== 'sign_type' && payload[k] !== '' && payload[k] != null)
    .sort();

  const content = sortedKeys.map(k => `${k}=${payload[k]}`).join('&');
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(content, 'utf8');
  verifier.end();
  const ok = verifier.verify(publicKey, sign, 'base64');
  return { ok, reason: ok ? '' : '签名校验失败' };
}

function assertStrictObjectKeys(input, { label = 'payload', allowedKeys = [], requiredKeys = [] } = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error(`${label} 格式错误`);
  }

  const allowed = new Set(allowedKeys);
  const actualKeys = Object.keys(input);
  for (const key of actualKeys) {
    if (!allowed.has(key)) {
      throw new Error(`${label} 存在未允许字段: ${key}`);
    }
  }

  for (const key of requiredKeys) {
    if (!(key in input)) {
      throw new Error(`${label} 缺少必填字段: ${key}`);
    }
  }
}

function validateNotifyPayloadByWhitelist(payload) {
  assertStrictObjectKeys(payload, {
    label: 'alipayNotify',
    allowedKeys: [
      'notify_time',
      'notify_type',
      'notify_id',
      'app_id',
      'charset',
      'version',
      'sign_type',
      'sign',
      'trade_no',
      'out_trade_no',
      'out_biz_no',
      'buyer_id',
      'buyer_logon_id',
      'seller_id',
      'seller_email',
      'trade_status',
      'total_amount',
      'receipt_amount',
      'invoice_amount',
      'buyer_pay_amount',
      'point_amount',
      'refund_fee',
      'subject',
      'body',
      'gmt_create',
      'gmt_payment',
      'gmt_refund',
      'gmt_close',
      'fund_bill_list',
      'passback_params',
      'voucher_detail_list'
    ],
    requiredKeys: ['app_id', 'trade_no', 'out_trade_no', 'trade_status', 'total_amount', 'sign', 'sign_type']
  });
}

function parseAmountFen(totalAmountText) {
  const amount = Number(String(totalAmountText || '').trim());
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return Math.round(amount * 100);
}

function alipaySuccess(res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  return res.status(200).send('success');
}

function alipayFail(res, message = 'fail') {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  return res.status(200).send(message);
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return alipayFail(res, 'method_not_allowed');

  let rawBody = '';
  try {
    rawBody = await readRawBody(req);
  } catch {
    return alipayFail(res, 'read_body_failed');
  }

  const payload = parseFormBody(rawBody);
  try {
    validateNotifyPayloadByWhitelist(payload);
  } catch (err) {
    return alipayFail(res, `payload_invalid:${err.message || 'unknown'}`);
  }

  const expectedAppId = String(process.env.ALIPAY_APP_ID || '').trim();
  if (expectedAppId && String(payload.app_id || '').trim() !== expectedAppId) {
    return alipayFail(res, 'app_id_mismatch');
  }

  const verify = verifyAlipaySignature(payload);
  if (!verify.ok) {
    return alipayFail(res, verify.reason || 'signature_invalid');
  }

  const orderId = String(payload.out_trade_no || '').trim();
  const transactionId = String(payload.trade_no || '').trim();
  const tradeStatus = String(payload.trade_status || '').trim();
  const totalAmountFen = parseAmountFen(payload.total_amount);

  if (!orderId || !transactionId) {
    return alipayFail(res, 'missing_trade_ids');
  }

  await saveVipPaymentEvent({
    type: 'alipay_notify_raw',
    orderId,
    transactionId,
    payload
  });

  if (tradeStatus !== 'TRADE_SUCCESS' && tradeStatus !== 'TRADE_FINISHED') {
    return alipaySuccess(res);
  }

  const alreadyProcessed = await hasVipPaymentEventTransaction({
    type: 'alipay_notify_paid',
    transactionId
  });
  if (alreadyProcessed) return alipaySuccess(res);

  const order = await markVipPaymentPaidByCallback({
    orderId,
    transactionId,
    channel: 'alipay',
    rawNotifyJson: payload
  });
  if (!order) return alipayFail(res, 'order_not_found');

  if (totalAmountFen > 0 && Number(order.amountFen) > 0 && totalAmountFen !== Number(order.amountFen)) {
    await saveVipPaymentEvent({
      type: 'alipay_notify_amount_mismatch',
      orderId,
      transactionId,
      payload: {
        expectedAmountFen: Number(order.amountFen),
        actualAmountFen: totalAmountFen,
        tradeStatus
      }
    });
    return alipayFail(res, 'amount_mismatch');
  }

  await saveVipPaymentEvent({
    type: 'alipay_notify_paid',
    orderId,
    transactionId,
    payload: {
      tradeStatus,
      totalAmountFen,
      notifyId: payload.notify_id || ''
    }
  });

  return alipaySuccess(res);
}
