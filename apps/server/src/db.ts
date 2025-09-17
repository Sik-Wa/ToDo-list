import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error('Missing DATABASE_URL');
}

export const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }>{
	return pool.query(text, params);
}

