import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { errorResponse } from "@/lib/http";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params;
  const r2Key = decodeURIComponent(key.join("/"));
  const db = await getDb();
  const row = await db.prepare("SELECT * FROM media WHERE r2_key = ?").bind(r2Key).first<Record<string, unknown>>();
  if (!row) return errorResponse("NOT_FOUND", "Media not found.", 404);
  const { env } = await getCloudflareContext({ async: true });
  const object = await env.MEDIA_BUCKET.get(r2Key);
  if (!object) return errorResponse("NOT_FOUND", "Media object not found.", 404);
  const headers = new Headers({ "content-type": object.httpMetadata?.contentType ?? String(row.mime_type), "cache-control": "public, max-age=31536000, immutable" });
  return new Response(object.body, { headers });
}

export const config = { runtime: "nodejs" };