import { redirect } from "@sveltejs/kit";
import { validateSessionToken } from "$lib/server/session";
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/schema';

export const load = async ({ cookies }) => {
	const token = cookies.get("session");
	if (!token) throw redirect(302, "/login");

	const { session } = await validateSessionToken(token);
	if (!session) throw redirect(302, "/login");

    const users = await db.select().from(userTable);
	return { users };
};
