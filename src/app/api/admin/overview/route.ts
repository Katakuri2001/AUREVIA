import { requireAdmin } from "@/lib/admin";
import { errorResponse, json } from "@/lib/http";
import { getDashboardOverview } from "@/lib/queries";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  return json(await getDashboardOverview());
}

export const config = { runtime: "nodejs" };