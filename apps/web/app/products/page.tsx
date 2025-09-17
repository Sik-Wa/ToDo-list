"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCartStore } from '../../stores/cart';

type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	stock_quantity: number;
};

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const { addItemToCart } = useCartStore();

	useEffect(() => {
		axios.get('/api/products')
			.then(r => setProducts(r.data))
			.catch(() => setProducts([]));
	}, []);

	return (
		<main style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
			<h2>Products</h2>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
				{products.map(p => (
					<div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
						<h3>{p.name}</h3>
						<p style={{ color: '#555' }}>{p.description}</p>
						<strong>${(p.price / 100).toFixed(2)}</strong>
						<div>
							<button onClick={() => addItemToCart({ productId: p.id, name: p.name, price: p.price, quantity: 1 })}>
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}

