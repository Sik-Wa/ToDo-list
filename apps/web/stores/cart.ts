"use client";
import { create } from 'zustand';

export type CartItem = {
	productId: string;
	name: string;
	price: number; // cents
	quantity: number;
};

type CartState = {
\titems: CartItem[];
	addItemToCart: (item: CartItem) => void;
	removeItemFromCart: (productId: string) => void;
	clearCart: () => void;
	totalCents: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	addItemToCart: (item) => set(state => {
		const existing = state.items.find(i => i.productId === item.productId);
		if (existing) {
			return {
				items: state.items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i)
			};
		}
		return { items: [...state.items, item] };
	}),
	removeItemFromCart: (productId) => set(state => ({ items: state.items.filter(i => i.productId !== productId) })),
	clearCart: () => set({ items: [] }),
	totalCents: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}));

