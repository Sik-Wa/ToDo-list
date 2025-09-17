import { Router } from 'express';
import { query } from '../db.js';

export const ordersRouter = Router();

ordersRouter.get('/', async (_req, res) => {
	const { rows } = await query('SELECT * FROM orders ORDER BY created_at DESC');
	res.json(rows);
});

ordersRouter.post('/', async (req, res) => {
	const { user_id, total_amount, status } = req.body;
	const { rows } = await query(
		'INSERT INTO orders (user_id, total_amount, status) VALUES ($1,$2,$3) RETURNING *',
		[user_id, total_amount, status || 'pending']
	);
	res.status(201).json(rows[0]);
});

