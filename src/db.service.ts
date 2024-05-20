import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import 'dotenv/config';
import * as schema from 'src/drizzle/migrations/schema';

const queryClient = postgres(process.env.DB_URL);
export const db = drizzle(queryClient, { schema: schema });
