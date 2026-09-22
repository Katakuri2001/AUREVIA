import { getPosts } from "@/lib/queries";
import type { Status } from "@/lib/types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? undefined;
  const category = url.searchParams.get("category") ?? undefined;
  const statusParam = url.searchParams.get("status");
  const status = statusParam === "draft" || statusParam === "published" || statusParam === "archived" ? statusParam as Status : undefined;
  const posts = await getPosts({ status: status ?? "published", category, search, limit: Number(url.searchParams.get("limit") ?? 20) });
  return Response.json({ ok: true, data: posts });
}

export const config = { runtime: "nodejs" };