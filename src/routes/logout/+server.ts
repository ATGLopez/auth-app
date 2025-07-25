import { redirect } from "@sveltejs/kit";
import { deleteSessionTokenCookie } from "$lib/server/session";

export const GET = async ({ cookies }) => {
	deleteSessionTokenCookie({ cookies } as any); // clear session cookie
	throw redirect(302, "/login");
};