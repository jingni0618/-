import crypto from 'node:crypto';
import { ensureVipSchema, pool } from './_db.js';

const ORDER_TTL_MS = 15 * 60 * 1000;

function now() {
  return Date.now();
}

export function buildVipOrderId() {
  return `vip_${now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
}

function mapOrder(row) {
  if (!row) return null;
  return {
    orderId: row.order_id,
    status: row.status,
    productType: row.product_type,
    amountFen: row.amount_fen,
    qrUrl: row.qr_url,
    scene: row.scene,
    createdAt: Number(row.created_at),
    expiresAt: Number(row.expires_at),
    paidAt: row.paid_at ? Number(row.paid_at) : null,
    unlockConsumedAt: row.unlock_consumed_at ? Number(row.unlock_consumed_at) : null,
    paymentChannel: row.payment_channel,
    paymentTxnId: row.payment_txn_id,
    callbackReceivedAt: row.callback_received_at ? Number(row.callback_received_at) : null,
    rawNotifyJson: row.raw_notify_json || null
  };
}

export async function createVipPaymentOrder({ amountFen = 100, qrUrl = '', productType = 'deep', scene = '' } = {}) {
  await ensureVipSchema();
  const orderId = buildVipOrderId();
  const createdAt = now();
  const expiresAt = createdAt + ORDER_TTL_MS;

  await pool.query(
    `
      INSERT INTO vip_payment_orders (
        order_id, status, product_type, amount_fen, qr_url, scene,
        created_at, expires_at, paid_at, unlock_consumed_at,
        payment_channel, payment_txn_id, callback_received_at, raw_notify_json
      ) VALUES ($1, 'pending', $2, $3, $4, $5, $6, $7, NULL, NULL, NULL, NULL, NULL, NULL)
    `,
    [orderId, productType, amountFen, qrUrl, scene, createdAt, expiresAt]
  );

  return {
    orderId,
    status: 'pending',
    productType,
    amountFen,
    qrUrl,
    scene,
    createdAt,
    expiresAt,
    paidAt: null,
    unlockConsumedAt: null,
    paymentChannel: null,
    paymentTxnId: null,
    callbackReceivedAt: null
  };
}

export async function getVipPaymentOrder(orderId) {
  await ensureVipSchema();

  await pool.query(
    `
      UPDATE vip_payment_orders
      SET status = 'expired'
      WHERE order_id = $1
        AND status = 'pending'
        AND expires_at <= $2
    `,
    [orderId, now()]
  );

  const result = await pool.query(
    'SELECT * FROM vip_payment_orders WHERE order_id = $1 LIMIT 1',
    [orderId]
  );
  return mapOrder(result.rows[0]);
}

export async function markVipPaymentPaid(orderId, channel = 'admin') {
  await ensureVipSchema();
  const paidAt = now();

  const result = await pool.query(
    `
      UPDATE vip_payment_orders
      SET status = CASE WHEN status = 'unlocked' THEN 'unlocked' ELSE 'paid' END,
          paid_at = COALESCE(paid_at, $2),
          payment_channel = COALESCE(payment_channel, $3)
      WHERE order_id = $1
      RETURNING *
    `,
    [orderId, paidAt, channel]
  );

  return mapOrder(result.rows[0]);
}

export async function markVipPaymentPaidByCallback({ orderId, transactionId = '', channel = 'wechat', rawNotifyJson = null } = {}) {
  await ensureVipSchema();
  const paidAt = now();

  const result = await pool.query(
    `
      UPDATE vip_payment_orders
      SET status = CASE WHEN status = 'unlocked' THEN 'unlocked' ELSE 'paid' END,
          paid_at = COALESCE(paid_at, $2),
          payment_channel = $3,
          payment_txn_id = COALESCE(NULLIF($4, ''), payment_txn_id),
          callback_received_at = $5,
          raw_notify_json = COALESCE($6::jsonb, raw_notify_json)
      WHERE order_id = $1
      RETURNING *
    `,
    [orderId, paidAt, channel, transactionId, paidAt, rawNotifyJson ? JSON.stringify(rawNotifyJson) : null]
  );

  return mapOrder(result.rows[0]);
}

export async function consumeVipPaymentUnlock(orderId) {
  await ensureVipSchema();
  const unlockAt = now();

  const result = await pool.query(
    `
      UPDATE vip_payment_orders
      SET status = 'unlocked',
          unlock_consumed_at = COALESCE(unlock_consumed_at, $2)
      WHERE order_id = $1
        AND status IN ('paid', 'unlocked')
      RETURNING *
    `,
    [orderId, unlockAt]
  );

  return mapOrder(result.rows[0]);
}

export async function saveVipPaymentEvent(event) {
  await ensureVipSchema();
  await pool.query(
    `
      INSERT INTO vip_payment_events (type, order_id, transaction_id, payload, created_at)
      VALUES ($1, $2, $3, $4::jsonb, $5)
    `,
    [
      String(event?.type || 'unknown'),
      event?.orderId || null,
      event?.transactionId || null,
      JSON.stringify(event?.payload || {}),
      now()
    ]
  );
}

