import { redirect, type RequestEvent } from "@sveltejs/kit";
import { deleteSessionTokenCookie } from "$lib/server/session";

export const GET = async (event: RequestEvent) => {
	deleteSessionTokenCookie(event);
	throw redirect(302, "/login");
};