import { getDb } from "@/lib/db";
import { errorResponse, json, parseJsonBody } from "@/lib/http";
import { requireAdmin } from "@/lib/admin";
import { loginSchema, validationIssues } from "@/lib/validation";
import { createUserSession, deleteSession, verifyPassword } from "@/lib/auth";
import { clearSessionCookie, createSessionCookie, getCookieHeader } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  let body: unknown;
  try { body = parseJsonBody(await request.json()); } catch { return errorResponse("INVALID_JSON", "Request body must be valid JSON.", 400); }
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return errorResponse("VALIDATION_ERROR", "Please check your credentials.", 400, validationIssues(parsed.error));
  const db = await getDb();
  const row = await db.prepare("SELECT * FROM users WHERE email = ?").bind(parsed.data.email).first<Record<string, unknown>>();
  if (!row || !(await verifyPassword(parsed.data.password, String(row.password_hash)))) {
    return errorResponse("INVALID_CREDENTIALS", "The email or password is incorrect.", 401);
  }
  const userAgent = request.headers.get("user-agent");
  const session = await createUserSession(String(row.id), userAgent, null);
  const cookie = createSessionCookie(session.token);
  return new Response(JSON.stringify({ ok: true, data: { user: session } }), { status: 200, headers: { "content-type": "application/json", "set-cookie": cookie } });
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  return json({ user });
}

export async function DELETE() {
  const store = await cookies();
  const token = getCookieHeader(store.toString(), "aurevia_session");
  await deleteSession(token);
  return new Response(JSON.stringify({ ok: true, data: { message: "Signed out." } }), { status: 200, headers: { "content-type": "application/json", "set-cookie": clearSessionCookie() } });
}

export const config = { runtime: "nodejs" };