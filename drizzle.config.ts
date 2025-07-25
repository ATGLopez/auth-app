import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/schema.ts',
	dialect: 'sqlite',
	dbCredentials: { url: "./local.db" },
	verbose: true,
	strict: true
});
