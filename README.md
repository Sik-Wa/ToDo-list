# Multiuser E-commerce Monorepo

Monorepo with Next.js client, Express server, Neon PostgreSQL, Zustand, and Pesapal integration.

## Getting Started

1. Copy env:
```bash
cp .env.example .env
```
2. Install deps:
```bash
npm install
```
3. Run dev servers:
```bash
npm run dev:server
npm run dev:web
```

## Server
- Express API on port 4000
- Routes: `/api/auth/*`, `/api/products`, `/api/orders`, `/api/payments/pesapal`
- Configure `DATABASE_URL`, Pesapal keys in `.env`

## Client
- Next.js app on port 3000
- Zustand stores for cart and auth
- Calls API endpoints via Next.js `rewrites` to `http://localhost:4000`

## Database Schema (PostgreSQL)
Suggested minimal tables:
```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'buyer'
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  stock_quantity INTEGER NOT NULL,
  seller_id UUID REFERENCES users(id)
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
```

## Pesapal
- Server route exchanges keys for OAuth token, submits order, returns redirect URL
- Implement IPN handler at `/api/payments/pesapal/ipn` to update order status

## Notes
- For local dev, set `PUBLIC_URL=http://localhost:3000`
- Secure secrets in production