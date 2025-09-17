"use client";
import { useAuthStore } from '../../stores/auth';

export default function AccountPage() {
	const { user, login, logout } = useAuthStore();

	return (
		<main style={{ padding: 24, maxWidth: 640, margin: '0 auto' }}>
			<h2>Account</h2>
			{user ? (
				<div>
					<p>Welcome, {user.name}</p>
					<button onClick={logout}>Logout</button>
				</div>
			) : (
				<div>
					<button onClick={() => login({ id: 'demo', name: 'Demo User', email: 'demo@example.com', role: 'buyer' })}>Login (demo)</button>
				</div>
			)}
		</main>
	);
}

