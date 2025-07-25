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

		if (!username || !password) {
			return fail(400, { message: "Both fields are required." });
		}

		const users = await db
			.select()
			.from(userTable)
			.where(eq(userTable.username, username));

		const user = users[0];

		if (!user || user.password !== password) {
			return fail(400, { message: "Invalid credentials." });
		}

		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie({ cookies } as any, token, session.expiresAt);

		throw redirect(302, "/dashboard");
	}
};
