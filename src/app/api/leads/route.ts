import { getDb } from "@/lib/db";
import { errorResponse, hashIp, json, parseJsonBody } from "@/lib/http";
import { clientRateLimitKey, checkRateLimit } from "@/lib/rate-limit";
import { leadSchema, validationIssues } from "@/lib/validation";

export async function POST(request: Request) {
  if (!checkRateLimit(`lead:${clientRateLimitKey(request)}`, 5, 60_000)) {
    return errorResponse("RATE_LIMITED", "Too many requests. Please wait a moment and try again.", 429);
  }
  let body: unknown;
  try {
    body = parseJsonBody(await request.json());
  } catch {
    return errorResponse("INVALID_JSON", "Request body must be valid JSON.", 400);
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields.", 400, validationIssues(parsed.error));
  const db = await getDb();
  const id = crypto.randomUUID();
  await db.prepare("INSERT INTO leads (id,name,email,company,service,message,ip_hash,created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, parsed.data.name, parsed.data.email, parsed.data.company, parsed.data.service, parsed.data.message, await hashIp(request), new Date().toISOString())
    .run();
  return json({ id, message: "Signal received." }, 201);
}

export const config = { runtime: "nodejs" };