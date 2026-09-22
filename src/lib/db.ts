import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1Database } from "@cloudflare/workers-types";

export async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 binding DB is not available.");
  }
  return env.DB;
}
