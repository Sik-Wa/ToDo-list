"use client";
import axios from 'axios';
import { useCartStore } from '../../stores/cart';

export default function CartPage() {
	const { items, totalCents, clearCart } = useCartStore();

	async function checkout() {
		const response = await axios.post('/api/payments/pesapal', {
			amount: totalCents(),
			items
		});
		const { redirectUrl } = response.data;
		window.location.href = redirectUrl;
	}

	return (
		<main style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
			<h2>Cart</h2>
			<ul>
				{items.map(i => (
					<li key={i.productId}>
						{i.name} x{i.quantity} — ${(i.price * i.quantity / 100).toFixed(2)}
					</li>
				))}
			</ul>
			<p>Total: ${(totalCents() / 100).toFixed(2)}</p>
			<div style={{ display: 'flex', gap: 8 }}>
				<button onClick={checkout} disabled={!items.length}>Checkout</button>
				<button onClick={clearCart} disabled={!items.length}>Clear</button>
			</div>
		</main>
	);
}

