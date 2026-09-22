import { cookies } from "next/headers";
import { deleteSession, getCookieHeader, clearSessionCookie } from "@/lib/auth";

export async function POST() {
  const store = await cookies();
  const token = getCookieHeader(store.toString(), "aurevia_session");
  await deleteSession(token);
  return new Response(JSON.stringify({ ok: true, data: { message: "Signed out." } }), { status: 200, headers: { "content-type": "application/json", "set-cookie": clearSessionCookie() } });
}

export const config = { runtime: "nodejs" };