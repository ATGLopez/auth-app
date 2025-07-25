import sqlite from "better-sqlite3";
import { config } from "dotenv";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";

import type { InferSelectModel } from "drizzle-orm";

config();

const sqliteDB = sqlite(process.env.DATABASE_URL!);
export const db = drizzle(sqliteDB);

export const userTable = sqliteTable("user", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	username: text("username").notNull().unique(),
	password: text("password").notNull()
});

export const sessionTable = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at", {
		mode: "timestamp"
	}).notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
