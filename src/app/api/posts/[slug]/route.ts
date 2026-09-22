import { getPostBySlug } from "@/lib/queries";
import { notFoundResponse } from "@/lib/http";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== "published") return notFoundResponse("Insight not found.");
  return Response.json({ ok: true, data: post });
}

export const config = { runtime: "nodejs" };