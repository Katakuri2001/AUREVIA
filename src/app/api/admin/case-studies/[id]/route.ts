import { getDb } from "@/lib/db";
import { requireAdmin, assertMutationOrigin } from "@/lib/admin";
import { errorResponse, json, parseJsonBody } from "@/lib/http";
import { caseStudyInputSchema, validationIssues } from "@/lib/validation";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  if (!(await assertMutationOrigin(request))) return errorResponse("INVALID_ORIGIN", "Request origin could not be verified.", 403);
  const { id } = await params;
  let body: unknown;
  try { body = parseJsonBody(await request.json()); } catch { return errorResponse("INVALID_JSON", "Request body must be valid JSON.", 400); }
  const parsed = caseStudyInputSchema.safeParse(body);
  if (!parsed.success) return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields.", 400, validationIssues(parsed.error));
  const db = await getDb();
  await db.prepare("UPDATE case_studies SET slug=?, client=?, title=?, service_category=?, challenge=?, strategy=?, execution=?, results=?, testimonial=?, cover_media_id=?, featured=?, status=?, published_at=?, updated_at=? WHERE id=?")
    .bind(parsed.data.slug, parsed.data.client, parsed.data.title, parsed.data.serviceCategory, parsed.data.challenge, parsed.data.strategy, parsed.data.execution, parsed.data.results, parsed.data.testimonial, parsed.data.coverMediaId || null, parsed.data.featured ? 1 : 0, parsed.data.status, parsed.data.publishedAt || null, new Date().toISOString(), id)
    .run();
  await db.prepare("DELETE FROM case_study_metrics WHERE case_study_id = ?").bind(id).run();
  await db.batch(parsed.data.metrics.map((metric, index) => db.prepare("INSERT INTO case_study_metrics (id,case_study_id,label,value,sort_order) VALUES (?, ?, ?, ?, ?)").bind(crypto.randomUUID(), id, metric.label, metric.value, index)));
  return json({ id });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  const { id } = await params;
  await (await getDb()).prepare("DELETE FROM case_studies WHERE id = ?").bind(id).run();
  return json({ id });
}

export const config = { runtime: "nodejs" };