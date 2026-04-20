import crypto from 'node:crypto';

const ALIPAY_GATEWAY = 'https://openapi.alipay.com/gateway.do';

function normalizePrivateKey(raw = '') {
  const text = String(raw || '').trim().replace(/\\n/g, '\n');
  if (!text) return '';
  if (text.includes('BEGIN')) return text;
  return `-----BEGIN PRIVATE KEY-----\n${text}\n-----END PRIVATE KEY-----`;
}

function formatAlipayTimestamp(date = new Date()) {
  const pad = value => String(value).padStart(2, '0');
  return [
    date.getFullYear(),
    '-',
    pad(date.getMonth() + 1),
    '-',
    pad(date.getDate()),
    ' ',
    pad(date.getHours()),
    ':',
    pad(date.getMinutes()),
    ':',
    pad(date.getSeconds())
  ].join('');
}

function buildSignContent(params = {}) {
  return Object.keys(params)
    .filter(key => key !== 'sign' && params[key] !== '' && params[key] != null)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
}

function signAlipayParams(params = {}) {
  const privateKey = normalizePrivateKey(process.env.ALIPAY_APP_PRIVATE_KEY);
  if (!privateKey) throw new Error('ALIPAY_APP_PRIVATE_KEY 未配置');

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(buildSignContent(params), 'utf8');
  signer.end();
  return signer.sign(privateKey, 'base64');
}

function getAlipayConfigStatus() {
  return {
    appId: Boolean(String(process.env.ALIPAY_APP_ID || '').trim()),
    privateKey: Boolean(String(process.env.ALIPAY_APP_PRIVATE_KEY || '').trim()),
    publicKey: Boolean(String(process.env.ALIPAY_PUBLIC_KEY || '').trim())
  };
}

export function isAlipayPrecreateConfigured() {
  const status = getAlipayConfigStatus();
  return status.appId && status.privateKey && status.publicKey;
}

export function buildNotifyUrl(req) {
  const configured = String(process.env.ALIPAY_NOTIFY_URL || '').trim();
  if (configured) return configured;

  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').trim();
  if (!host) return '';
  const proto = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim() || 'https';
  return `${proto}://${host}/api/vip-payment-alipay-notify`;
}

export async function createAlipayPrecreateOrder({ orderId, amountFen, subject, notifyUrl }) {
  if (!isAlipayPrecreateConfigured()) {
    throw new Error('支付宝预创建订单配置不完整');
  }
  if (!orderId) throw new Error('缺少支付宝商户订单号');
  if (!notifyUrl) throw new Error('缺少支付宝回调地址');

  const amountYuan = (Number(amountFen || 0) / 100).toFixed(2);
  const params = {
    app_id: String(process.env.ALIPAY_APP_ID || '').trim(),
    method: 'alipay.trade.precreate',
    charset: 'utf-8',
    sign_type: 'RSA2',
    timestamp: formatAlipayTimestamp(),
    version: '1.0',
    notify_url: notifyUrl,
    biz_content: JSON.stringify({
      out_trade_no: orderId,
      total_amount: amountYuan,
      subject: subject || '塔罗之眼进阶解牌',
      timeout_express: '15m'
    })
  };
  params.sign = signAlipayParams(params);

  const response = await fetch(ALIPAY_GATEWAY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: new URLSearchParams(params).toString()
  });

  const data = await response.json();
  const result = data?.alipay_trade_precreate_response;
  if (!response.ok || result?.code !== '10000' || !result?.qr_code) {
    const message = result?.sub_msg || result?.msg || '支付宝预创建订单失败';
    throw new Error(message);
  }

  return {
    qrUrl: result.qr_code,
    tradeNo: result.trade_no || '',
    outTradeNo: result.out_trade_no || orderId,
    raw: result
  };
}
