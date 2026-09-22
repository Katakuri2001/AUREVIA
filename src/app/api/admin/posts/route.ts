import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireAdmin, assertMutationOrigin } from "@/lib/admin";
import { errorResponse, json, parseJsonBody } from "@/lib/http";
import { postInputSchema, validationIssues } from "@/lib/validation";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  const { getPosts } = await import("@/lib/queries");
  return json(await getPosts());
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  if (!(await assertMutationOrigin(request))) return errorResponse("INVALID_ORIGIN", "Request origin could not be verified.", 403);
  let body: unknown;
  try { body = parseJsonBody(await request.json()); } catch { return errorResponse("INVALID_JSON", "Request body must be valid JSON.", 400); }
  const parsed = postInputSchema.safeParse(body);
  if (!parsed.success) return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields.", 400, validationIssues(parsed.error));
  const db = await getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare("INSERT INTO posts (id,slug,title,excerpt,body,category_id,author_id,status,seo_title,seo_description,published_at,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, parsed.data.slug, parsed.data.title, parsed.data.excerpt, parsed.data.body, parsed.data.categoryId, user.id, parsed.data.status, parsed.data.seoTitle, parsed.data.seoDescription, parsed.data.publishedAt || null, now, now)
    .run();
  return json({ id }, 201);
}

export const config = { runtime: "nodejs" };