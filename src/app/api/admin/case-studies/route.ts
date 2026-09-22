import { getDb } from "@/lib/db";
import { requireAdmin, assertMutationOrigin } from "@/lib/admin";
import { errorResponse, json, parseJsonBody } from "@/lib/http";
import { caseStudyInputSchema, validationIssues } from "@/lib/validation";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  const { getCaseStudies } = await import("@/lib/queries");
  return json(await getCaseStudies());
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  if (!(await assertMutationOrigin(request))) return errorResponse("INVALID_ORIGIN", "Request origin could not be verified.", 403);
  let body: unknown;
  try { body = parseJsonBody(await request.json()); } catch { return errorResponse("INVALID_JSON", "Request body must be valid JSON.", 400); }
  const parsed = caseStudyInputSchema.safeParse(body);
  if (!parsed.success) return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields.", 400, validationIssues(parsed.error));
  const db = await getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare("INSERT INTO case_studies (id,slug,client,title,service_category,challenge,strategy,execution,results,testimonial,cover_media_id,featured,status,published_at,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, parsed.data.slug, parsed.data.client, parsed.data.title, parsed.data.serviceCategory, parsed.data.challenge, parsed.data.strategy, parsed.data.execution, parsed.data.results, parsed.data.testimonial, parsed.data.coverMediaId || null, parsed.data.featured ? 1 : 0, parsed.data.status, parsed.data.publishedAt || null, now, now)
    .run();
  await db.batch(parsed.data.metrics.map((metric, index) => db.prepare("INSERT INTO case_study_metrics (id,case_study_id,label,value,sort_order) VALUES (?, ?, ?, ?, ?)").bind(crypto.randomUUID(), id, metric.label, metric.value, index)));
  return json({ id }, 201);
}

export const config = { runtime: "nodejs" };