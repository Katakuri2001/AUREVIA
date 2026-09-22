import { cookies, headers } from "next/headers";
import { getCookieHeader, getUserFromToken } from "@/lib/auth";
import type { SessionUser } from "@/lib/auth";

export async function requireAdmin(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get("aurevia_session")?.value;
  return getUserFromToken(token);
}

export async function assertMutationOrigin(request: Request): Promise<boolean> {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const host = (await headers()).get("host");
    if (!host) return false;
    return originUrl.host === host || originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

export function cookieToken(store: Awaited<ReturnType<typeof cookies>>): string | undefined {
  return getCookieHeader(store.toString(), "aurevia_session");
}
