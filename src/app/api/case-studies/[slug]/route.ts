import { getCaseStudyBySlug } from "@/lib/queries";
import { notFoundResponse } from "@/lib/http";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study || study.status !== "published") return notFoundResponse("Case study not found.");
  return Response.json({ ok: true, data: study });
}

export const config = { runtime: "nodejs" };