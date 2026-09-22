import { requireAdmin } from "@/lib/admin";
import { errorResponse, json } from "@/lib/http";
import { getServices } from "@/lib/queries";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  return json({ services: await getServices() });
}

export const config = { runtime: "nodejs" };