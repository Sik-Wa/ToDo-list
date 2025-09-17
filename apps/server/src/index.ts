import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.js';
import { authRouter } from './routes/auth.js';
import { ordersRouter } from './routes/orders.js';
import { paymentsRouter } from './routes/payments.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});

