import { getServices, getPosts } from "@/lib/queries";

export async function GET() {
  const [services, posts] = await Promise.all([getServices(), getPosts({ status: "published", limit: 3 })]);
  return Response.json({ ok: true, data: { services, posts } });
}

export const config = { runtime: "nodejs" };