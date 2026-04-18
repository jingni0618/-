import crypto from 'node:crypto';
import { markVipPaymentPaidByCallback, saveVipPaymentEvent } from './_vipPaymentRepository.js';

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Wechatpay-Signature, Wechatpay-Timestamp, Wechatpay-Nonce, Wechatpay-Serial');
}

function getWechatHeader(req, key) {
  return String(req.headers[key.toLowerCase()] || '').trim();
}

function verifyWechatV3Signature({ req, rawBody }) {
  const certPem = process.env.WECHAT_PAY_PLATFORM_CERT_PEM;
  if (!certPem) {
    throw new Error('WECHAT_PAY_PLATFORM_CERT_PEM 未配置');
  }

  const signature = getWechatHeader(req, 'Wechatpay-Signature');
  const timestamp = getWechatHeader(req, 'Wechatpay-Timestamp');
  const nonce = getWechatHeader(req, 'Wechatpay-Nonce');
  const serial = getWechatHeader(req, 'Wechatpay-Serial');

  if (!signature || !timestamp || !nonce || !serial) {
    return { ok: false, reason: '微信回调头缺失' };
  }

  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) {
    return { ok: false, reason: '时间戳格式错误' };
  }

  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - ts) > 300) {
    return { ok: false, reason: '回调已过期' };
  }

  const message = `${timestamp}\n${nonce}\n${rawBody}\n`;
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(message);
  verifier.end();
  const valid = verifier.verify(certPem, signature, 'base64');

  return { ok: valid, reason: valid ? '' : '签名不匹配', serial };
}

function decryptWechatResource(resource) {
  const key = process.env.WECHAT_PAY_API_V3_KEY;
  if (!key) {
    throw new Error('WECHAT_PAY_API_V3_KEY 未配置');
  }
  if (Buffer.byteLength(key, 'utf8') !== 32) {
    throw new Error('WECHAT_PAY_API_V3_KEY 必须是 32 字节');
  }

  const nonce = String(resource?.nonce || '');
  const ciphertext = String(resource?.ciphertext || '');
  const aad = String(resource?.associated_data || '');
  if (!nonce || !ciphertext) {
    throw new Error('回调密文参数不完整');
  }

  const data = Buffer.from(ciphertext, 'base64');
  if (data.length < 17) {
    throw new Error('回调密文长度异常');
  }

  const authTag = data.subarray(data.length - 16);
  const encrypted = data.subarray(0, data.length - 16);

  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'utf8'), Buffer.from(nonce, 'utf8'));
  if (aad) decipher.setAAD(Buffer.from(aad, 'utf8'));
  decipher.setAuthTag(authTag);
  const plain = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
  return JSON.parse(plain);
}

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

function wechatSuccess(res) {
  return res.status(200).json({ code: 'SUCCESS', message: '成功' });
}

function wechatFail(res, message = '失败') {
  return res.status(200).json({ code: 'FAIL', message });
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return wechatFail(res, '只接受 POST 请求');

  let rawBody = '';
  try {
    rawBody = await readRawBody(req);
  } catch {
    return wechatFail(res, '读取回调内容失败');
  }

  const verify = verifyWechatV3Signature({ req, rawBody });
  if (!verify.ok) {
    return wechatFail(res, verify.reason || '签名校验失败');
  }

  let notifyBody = null;
  try {
    notifyBody = JSON.parse(rawBody || '{}');
  } catch {
    return wechatFail(res, '回调 JSON 解析失败');
  }

  let transaction = null;
  try {
    transaction = decryptWechatResource(notifyBody.resource || {});
  } catch (err) {
    return wechatFail(res, `回调解密失败: ${err.message || 'unknown'}`);
  }

  const orderId = String(transaction?.out_trade_no || '').trim();
  const transactionId = String(transaction?.transaction_id || '').trim();
  const tradeState = String(transaction?.trade_state || '').trim();
  if (!orderId) return wechatFail(res, '缺少 out_trade_no');

  await saveVipPaymentEvent({
    type: 'wechat_notify_raw',
    orderId,
    transactionId,
    payload: { headerSerial: verify.serial, notifyBody, transaction }
  });

  if (tradeState !== 'SUCCESS') {
    return wechatSuccess(res);
  }

  const order = await markVipPaymentPaidByCallback({
    orderId,
    transactionId,
    channel: 'wechat',
    rawNotifyJson: notifyBody
  });
  if (!order) return wechatFail(res, '订单不存在');

  await saveVipPaymentEvent({
    type: 'wechat_notify_paid',
    orderId,
    transactionId,
    payload: { tradeState, transaction }
  });

  return wechatSuccess(res);
}
