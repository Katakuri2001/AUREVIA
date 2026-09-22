import type { ApiError, ApiResponse } from "@/lib/types";

export function json<T>(data: T, status = 200): Response {
  return Response.json({ ok: true, data } satisfies ApiResponse<T>, { status });
}

export function errorResponse(code: string, message: string, status: number, issues?: ApiError["error"]["issues"]): Response {
  return Response.json({
    ok: false,
    error: { code, message, ...(issues ? { issues } : {}) },
  } satisfies ApiError, { status });
}

export function notFoundResponse(message = "Resource not found."): Response {
  return errorResponse("NOT_FOUND", message, 404);
}

export function unauthorizedResponse(message = "Authentication is required."): Response {
  return errorResponse("UNAUTHORIZED", message, 401);
}

export function forbiddenResponse(message = "You do not have permission to do that."): Response {
  return errorResponse("FORBIDDEN", message, 403);
}

export function parseJsonBody<T>(value: unknown): T {
  if (!value || typeof value !== "object") throw new Error("Request body must be JSON.");
  return value as T;
}

export function getClientIp(request: Request): string | null {
  return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

export async function hashIp(request: Request): Promise<string> {
  const ip = getClientIp(request) ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function isJsonRequest(request: Request): boolean {
  return (request.headers.get("content-type") ?? "").includes("application/json");
}
