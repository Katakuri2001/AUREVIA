import { getCaseStudies } from "@/lib/queries";
import type { Status } from "@/lib/types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const featured = url.searchParams.get("featured");
  const statusParam = url.searchParams.get("status");
  const status = statusParam === "draft" || statusParam === "published" || statusParam === "archived" ? statusParam as Status : undefined;
  const studies = await getCaseStudies({ status: status ?? "published", ...(featured !== null ? { featured: featured === "true" } : {}) });
  return Response.json({ ok: true, data: studies });
}

export const config = { runtime: "nodejs" };