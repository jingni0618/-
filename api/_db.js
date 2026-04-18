import { Pool } from 'pg';

const pool = globalThis.__vipPgPool || new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false }
});

globalThis.__vipPgPool = pool;

let schemaReady = false;

export function ensureDatabaseConfigured() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL 未配置，无法使用支付数据库。');
  }
}

export async function ensureVipSchema() {
  ensureDatabaseConfigured();
  if (schemaReady) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vip_payment_orders (
      order_id TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      product_type TEXT NOT NULL,
      amount_fen INTEGER NOT NULL,
      qr_url TEXT,
      scene TEXT,
      created_at BIGINT NOT NULL,
      expires_at BIGINT NOT NULL,
      paid_at BIGINT,
      unlock_consumed_at BIGINT,
      payment_channel TEXT,
      payment_txn_id TEXT,
      callback_received_at BIGINT,
      raw_notify_json JSONB
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vip_payment_events (
      id BIGSERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      order_id TEXT,
      transaction_id TEXT,
      payload JSONB,
      created_at BIGINT NOT NULL
    );
  `);

  await pool.query('CREATE INDEX IF NOT EXISTS idx_vip_payment_orders_status ON vip_payment_orders(status);');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_vip_payment_orders_created_at ON vip_payment_orders(created_at);');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_vip_payment_events_order_id ON vip_payment_events(order_id);');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_vip_payment_events_created_at ON vip_payment_events(created_at);');
  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS ux_vip_payment_events_paid_txn
    ON vip_payment_events (type, transaction_id)
    WHERE type = 'alipay_notify_paid' AND transaction_id IS NOT NULL
  `);

  schemaReady = true;
}

export { pool };
