import crypto from 'node:crypto';

export function createVipToken(secret) {
  const exp = Date.now() + 24 * 60 * 60 * 1000;
  const payload = { exp, scope: 'vip-unlock' };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('hex');
  return { token: `${payloadB64}.${signature}`, expiresAt: exp };
}
