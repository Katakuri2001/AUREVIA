import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { errorResponse, json } from "@/lib/http";
import { requireAdmin, assertMutationOrigin } from "@/lib/admin";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  const db = await getDb();
  const result = await db.prepare("SELECT * FROM media ORDER BY created_at DESC").all<Record<string, unknown>>();
  return json(result.results);
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  if (!(await assertMutationOrigin(request))) return errorResponse("INVALID_ORIGIN", "Request origin could not be verified.", 403);
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) return errorResponse("INVALID_MEDIA", "Use multipart/form-data for media uploads.", 400);
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return errorResponse("INVALID_MEDIA", "A file is required.", 400);
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "video/mp4"];
  if (!allowed.includes(file.type) || file.size > 50 * 1024 * 1024) return errorResponse("INVALID_MEDIA", "Use a JPG, PNG, WebP, SVG, or MP4 under 50 MB.", 400);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `media/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const { env } = await getCloudflareContext({ async: true });
  await env.MEDIA_BUCKET.put(key, file.stream(), { httpMetadata: { contentType: file.type }, customMetadata: { originalName: file.name } });
  const db = await getDb();
  const id = crypto.randomUUID();
  await db.prepare("INSERT INTO media (id,filename,original_name,mime_type,size,r2_key,url,alt_text,created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, safeName, file.name, file.type, file.size, key, `/api/media/${encodeURIComponent(key)}`, "", new Date().toISOString())
    .run();
  return json({ id, url: `/api/media/${encodeURIComponent(key)}` }, 201);
}

export const config = { runtime: "nodejs" };