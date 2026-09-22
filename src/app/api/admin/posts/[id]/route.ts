import { getDb } from "@/lib/db";
import { requireAdmin, assertMutationOrigin } from "@/lib/admin";
import { errorResponse, json, parseJsonBody } from "@/lib/http";
import { postInputSchema, validationIssues } from "@/lib/validation";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  if (!(await assertMutationOrigin(request))) return errorResponse("INVALID_ORIGIN", "Request origin could not be verified.", 403);
  const { id } = await params;
  let body: unknown;
  try { body = parseJsonBody(await request.json()); } catch { return errorResponse("INVALID_JSON", "Request body must be valid JSON.", 400); }
  const parsed = postInputSchema.safeParse(body);
  if (!parsed.success) return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields.", 400, validationIssues(parsed.error));
  const db = await getDb();
  await db.prepare("UPDATE posts SET slug=?, title=?, excerpt=?, body=?, category_id=?, status=?, seo_title=?, seo_description=?, published_at=?, updated_at=? WHERE id=?")
    .bind(parsed.data.slug, parsed.data.title, parsed.data.excerpt, parsed.data.body, parsed.data.categoryId, parsed.data.status, parsed.data.seoTitle, parsed.data.seoDescription, parsed.data.publishedAt || null, new Date().toISOString(), id)
    .run();
  return json({ id });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  const { id } = await params;
  await (await getDb()).prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
  return json({ id });
}

export const config = { runtime: "nodejs" };