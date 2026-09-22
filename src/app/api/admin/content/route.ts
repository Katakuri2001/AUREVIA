import { requireAdmin } from "@/lib/admin";
import { errorResponse, json } from "@/lib/http";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  const { getCaseStudies, getPosts } = await import("@/lib/queries");
  const [posts, studies] = await Promise.all([getPosts(), getCaseStudies()]);
  return json({ posts, studies });
}

export const config = { runtime: "nodejs" };