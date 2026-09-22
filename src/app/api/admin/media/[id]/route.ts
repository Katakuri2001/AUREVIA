import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireAdmin } from "@/lib/admin";
import { errorResponse, json } from "@/lib/http";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  const { id } = await params;
  const db = await getDb();
  const row = await db.prepare("SELECT r2_key FROM media WHERE id = ?").bind(id).first<Record<string, unknown>>();
  if (row) {
    const { env } = await getCloudflareContext({ async: true });
    await env.MEDIA_BUCKET.delete(String(row.r2_key));
  }
  await db.prepare("DELETE FROM media WHERE id = ?").bind(id).run();
  return json({ id });
}

export const config = { runtime: "nodejs" };