import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import type { User } from "@/lib/types";
import { mapUser } from "@/lib/queries";

const SESSION_DAYS = 7;
const COOKIE_NAME = "aurevia_session";

export interface SessionUser extends User {
  sessionId: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function createUserSession(userId: string, userAgent?: string | null, ipHash?: string | null): Promise<SessionUser> {
  const token = getSessionToken();
  const tokenHash = await hashToken(token);
  const sessionId = crypto.randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const db = await getDb();
  await db
    .prepare("INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at, ip_hash, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(sessionId, userId, tokenHash, expires.toISOString(), now.toISOString(), ipHash ?? null, userAgent ?? null)
    .run();
  const row = await db.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first<Record<string, unknown>>();
  if (!row) throw new Error("User session could not be resolved.");
  return { ...mapUser(row), sessionId };
}

export async function getUserFromToken(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  const tokenHash = await hashToken(token);
  const row = await (await getDb())
    .prepare("SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?")
    .bind(tokenHash, new Date().toISOString())
    .first<Record<string, unknown>>();
  if (!row) return null;
  return { ...mapUser(row), sessionId: "" };
}

export async function deleteSession(token: string | undefined): Promise<void> {
  if (!token) return;
  const tokenHash = await hashToken(token);
  await (await getDb()).prepare("DELETE FROM sessions WHERE token_hash = ?").bind(tokenHash).run();
}

export function sessionCookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAge ?? SESSION_DAYS * 24 * 60 * 60,
  };
}

export function createSessionCookie(token: string): string {
  const options = sessionCookieOptions();
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=${options.path}; HttpOnly; SameSite=Lax${options.secure ? "; Secure" : ""}; Max-Age=${options.maxAge}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function getCookieHeader(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return undefined;
}
