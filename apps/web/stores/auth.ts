"use client";
import { create } from 'zustand';

export type User = {
	id: string;
	name: string;
	email: string;
	role: 'buyer' | 'seller' | 'admin';
};

type AuthState = {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	login: (user) => set({ user }),
	logout: () => set({ user: null })
}));

