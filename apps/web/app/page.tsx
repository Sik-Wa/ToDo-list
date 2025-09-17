import Link from 'next/link';

export default function HomePage() {
	return (
		<main style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '16px',
			padding: '24px',
			maxWidth: 960,
			margin: '0 auto'
		}}>
			<h1>ShopX</h1>
			<p>Starter for a multiuser e-commerce app.</p>
			<nav style={{ display: 'flex', gap: 12 }}>
				<Link href="/products">Products</Link>
				<Link href="/cart">Cart</Link>
				<Link href="/account">Account</Link>
			</nav>
		</main>
	);
}

