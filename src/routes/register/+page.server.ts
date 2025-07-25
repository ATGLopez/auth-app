import { fail, redirect } from "@sveltejs/kit";
import { db, userTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import type { Actions } from "@sveltejs/kit";

import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from "$lib/server/session";

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get("username")?.toString();
		const password = data.get("password")?.toString();
		const confirm_pass = data.get("confirm_pass")?.toString();

		if (!username || !password || !confirm_pass) {
			return fail(400, { message: "All fields are required." });
		}
        if (username.length < 3) {
			return fail(400, { error: 'Username must be at least 3 characters' });
		}
		if (password.length < 6) {
			return fail(400, { error: 'Password must be at least 6 characters' });
		}
        if (password !== confirm_pass) {
			return fail(400, { message: "Passwords do not match." });
		}

		// Check if user already exists
		const existing = await db
			.select()
			.from(userTable)
			.where(eq(userTable.username, username));

		if (existing.length > 0) {
			return fail(400, { message: "Username already taken." });
		}

		// Insert new user (store raw password for now)
		const [user] = await db
			.insert(userTable)
			.values({ username, password })
			.returning();

		// Create session
		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie({ cookies } as any, token, session.expiresAt);

		throw redirect(302, "/dashboard");
	}
};
