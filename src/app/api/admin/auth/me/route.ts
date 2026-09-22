import { requireAdmin } from "@/lib/admin";
import { errorResponse, json } from "@/lib/http";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  return json({ user });
}

export const config = { runtime: "nodejs" };