import { Router } from 'express';
import axios from 'axios';

export const paymentsRouter = Router();

paymentsRouter.post('/pesapal', async (req, res) => {
	const { amount, description, callbackUrl, reference } = req.body;
	const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
	const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
	const baseUrl = process.env.PESAPAL_BASE_URL || 'https://pay.pesapal.com/v3';

	if (!consumerKey || !consumerSecret) {
		return res.status(500).json({ error: 'Pesapal credentials not configured' });
	}

	try {
		// 1) Get OAuth token
		const tokenResp = await axios.post(`${baseUrl}/api/Auth/RequestToken`, {
			consumer_key: consumerKey,
			consumer_secret: consumerSecret
		});
		const token = tokenResp.data?.token;
		if (!token) return res.status(502).json({ error: 'Failed to obtain Pesapal token' });

		// 2) Register IPN URL if needed (optional, usually done once in dashboard)

		// 3) Submit order
		const orderResp = await axios.post(
			`${baseUrl}/api/Transactions/SubmitOrderRequest`,
			{
				id: reference || `ref_${Date.now()}`,
				currency: 'KES',
				amount,
				description: description || 'Order payment',
				notification_id: process.env.PESAPAL_NOTIFICATION_ID,
				callback_url: callbackUrl || (process.env.PUBLIC_URL || 'http://localhost:3000') + '/payment/callback'
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.json({ redirectUrl: orderResp.data?.redirect_url });
	} catch (err: any) {
		return res.status(502).json({ error: 'Pesapal error', details: err?.response?.data || err?.message });
	}
});

paymentsRouter.post('/pesapal/ipn', async (_req, res) => {
	// TODO: validate and update order status in DB
	res.json({ ok: true });
});

