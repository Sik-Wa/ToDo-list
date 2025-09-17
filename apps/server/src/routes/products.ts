import { Router } from 'express';
import { query } from '../db.js';

export const productsRouter = Router();

productsRouter.get('/', async (_req, res) => {
	const { rows } = await query('SELECT id, name, description, price, stock_quantity FROM products ORDER BY name ASC');
	res.json(rows);
});

productsRouter.post('/', async (req, res) => {
	const { name, description, price, stock_quantity, seller_id } = req.body;
	const { rows } = await query(
		'INSERT INTO products (name, description, price, stock_quantity, seller_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
		[name, description, price, stock_quantity, seller_id]
	);
	res.status(201).json(rows[0]);
});

productsRouter.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, description, price, stock_quantity } = req.body;
	const { rows } = await query(
		'UPDATE products SET name=$1, description=$2, price=$3, stock_quantity=$4 WHERE id=$5 RETURNING *',
		[name, description, price, stock_quantity, id]
	);
	res.json(rows[0]);
});

productsRouter.delete('/:id', async (req, res) => {
	const { id } = req.params;
	await query('DELETE FROM products WHERE id=$1', [id]);
	res.status(204).send();
});

