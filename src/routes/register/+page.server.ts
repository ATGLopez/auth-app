import { fail, redirect } from "@sveltejs/kit";
import { db, userTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from "$lib/server/session";

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get("username")?.toString();
		const password = data.get("password")?.toString();
		const confirm_pass = data.get("confirm_pass")?.toString();

		if (!username || !password || !confirm_pass) {
			return fail(400, { message: "All fields are required." });
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
