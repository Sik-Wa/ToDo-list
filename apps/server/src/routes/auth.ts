import { Router } from 'express';
import { query } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
	const { name, email, password, role } = req.body;
	const password_hash = await bcrypt.hash(password, 10);
	const { rows } = await query(
		'INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role',
		[name, email, password_hash, role || 'buyer']
	);
	res.status(201).json(rows[0]);
});

authRouter.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const { rows } = await query('SELECT id, name, email, password_hash, role FROM users WHERE email=$1', [email]);
	const user = rows[0];
	if (!user) return res.status(401).json({ error: 'Invalid credentials' });
	const ok = await bcrypt.compare(password, user.password_hash);
	if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
	const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
	res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

