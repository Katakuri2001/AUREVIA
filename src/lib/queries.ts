import { getDb } from "@/lib/db";
import type {
  Campaign,
  CaseStudy,
  CaseStudyMetric,
  Category,
  DashboardOverview,
  Lead,
  Media,
  Post,
  Service,
  SiteSetting,
  Status,
  Testimonial,
  User,
} from "@/lib/types";

type Row = Record<string, unknown>;

const toBoolean = (value: unknown): boolean => Number(value) === 1;
const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
const optionalString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

export function mapUser(row: Row): User {
  return {
    id: String(row.id),
    email: String(row.email),
    displayName: String(row.display_name),
    role: String(row.role) as User["role"],
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export function mapCategory(row: Row): Category {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    description: String(row.description),
    sortOrder: toNumber(row.sort_order),
  };
}

export function mapService(row: Row): Service {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    tagline: String(row.tagline),
    description: String(row.description),
    icon: String(row.icon),
    accent: String(row.accent),
    sortOrder: toNumber(row.sort_order),
    isActive: toBoolean(row.is_active),
  };
}

export function mapMedia(row: Row): Media {
  return {
    id: String(row.id),
    filename: String(row.filename),
    originalName: String(row.original_name),
    mimeType: String(row.mime_type),
    size: toNumber(row.size),
    r2Key: String(row.r2_key),
    url: String(row.url),
    altText: String(row.alt_text),
    createdAt: String(row.created_at),
  };
}

export function mapPost(row: Row, extras: { category?: Category; author?: User; cover?: Media | null } = {}): Post {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt),
    body: String(row.body),
    categoryId: String(row.category_id),
    category: extras.category,
    authorId: String(row.author_id),
    author: extras.author ? { id: extras.author.id, displayName: extras.author.displayName, email: extras.author.email } : undefined,
    coverMediaId: optionalString(row.cover_media_id),
    cover: extras.cover,
    status: String(row.status) as Status,
    seoTitle: String(row.seo_title),
    seoDescription: String(row.seo_description),
    publishedAt: optionalString(row.published_at),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export function mapMetric(row: Row): CaseStudyMetric {
  return {
    id: String(row.id),
    caseStudyId: String(row.case_study_id),
    label: String(row.label),
    value: String(row.value),
    sortOrder: toNumber(row.sort_order),
  };
}

export function mapCaseStudy(row: Row, extras: { metrics?: CaseStudyMetric[]; cover?: Media | null } = {}): CaseStudy {
  return {
    id: String(row.id),
    slug: String(row.slug),
    client: String(row.client),
    title: String(row.title),
    serviceCategory: String(row.service_category),
    challenge: String(row.challenge),
    strategy: String(row.strategy),
    execution: String(row.execution),
    results: String(row.results),
    testimonial: String(row.testimonial),
    coverMediaId: optionalString(row.cover_media_id),
    cover: extras.cover,
    featured: toBoolean(row.featured),
    status: String(row.status) as Status,
    metrics: extras.metrics ?? [],
    publishedAt: optionalString(row.published_at),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export function mapTestimonial(row: Row): Testimonial {
  return {
    id: String(row.id),
    name: String(row.name),
    role: String(row.role),
    company: String(row.company),
    quote: String(row.quote),
    caseStudyId: optionalString(row.case_study_id),
    featured: toBoolean(row.featured),
    sortOrder: toNumber(row.sort_order),
  };
}

export function mapLead(row: Row): Lead {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    company: String(row.company),
    service: String(row.service),
    message: String(row.message),
    status: String(row.status) as Lead["status"],
    createdAt: String(row.created_at),
  };
}

export function mapCampaign(row: Row): Campaign {
  return {
    id: String(row.id),
    name: String(row.name),
    service: String(row.service),
    status: String(row.status) as Campaign["status"],
    objective: String(row.objective),
    budgetCents: toNumber(row.budget_cents),
    startDate: optionalString(row.start_date),
    endDate: optionalString(row.end_date),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export function mapSetting(row: Row): SiteSetting {
  return {
    key: String(row.key),
    value: String(row.value),
    valueType: String(row.value_type) as SiteSetting["valueType"],
    updatedAt: String(row.updated_at),
  };
}

export async function getServices(): Promise<Service[]> {
  const db = await getDb();
  const result = await db.prepare("SELECT * FROM services ORDER BY sort_order ASC").all<Row>();
  return result.results.map(mapService);
}

export async function getCategories(): Promise<Category[]> {
  const db = await getDb();
  const result = await db.prepare("SELECT * FROM categories ORDER BY sort_order ASC").all<Row>();
  return result.results.map(mapCategory);
}

export async function getPosts(options?: { status?: Status; category?: string; search?: string; limit?: number }): Promise<Post[]> {
  const conditions: string[] = [];
  const params: Array<string | number> = [];
  if (options?.status) {
    conditions.push("p.status = ?");
    params.push(options.status);
  }
  if (options?.category) {
    conditions.push("c.slug = ?");
    params.push(options.category);
  }
  if (options?.search) {
    conditions.push("(p.title LIKE ? OR p.excerpt LIKE ? OR p.body LIKE ?)");
    const search = `%${options.search}%`;
    params.push(search, search, search);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const limit = Math.min(Math.max(options?.limit ?? 50, 1), 100);
  const db = await getDb();
  const result = await db
    .prepare(`SELECT p.*, c.slug AS category_slug, c.name AS category_name FROM posts p JOIN categories c ON c.id = p.category_id ${where} ORDER BY COALESCE(p.published_at, p.created_at) DESC LIMIT ?`)
    .bind(...params, limit)
    .all<Row>();
  const categories = await getCategories();
  return result.results.map((row) => {
    const category = categories.find((item) => item.slug === row.category_slug);
    return mapPost(row, { category });
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = await getDb();
  const result = await db
    .prepare(`SELECT p.*, c.slug AS category_slug, c.name AS category_name FROM posts p JOIN categories c ON c.id = p.category_id WHERE p.slug = ?`)
    .bind(slug)
    .first<Row>();
  if (!result) return null;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === result.category_slug);
  return mapPost(result, { category });
}

export async function getCaseStudies(options?: { status?: Status; featured?: boolean }): Promise<CaseStudy[]> {
  const conditions: string[] = [];
  const params: Array<string | number> = [];
  if (options?.status) {
    conditions.push("cs.status = ?");
    params.push(options.status);
  }
  if (options?.featured !== undefined) {
    conditions.push("cs.featured = ?");
    params.push(options.featured ? 1 : 0);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const db = await getDb();
  const result = await db
    .prepare(`SELECT cs.* FROM case_studies cs ${where} ORDER BY COALESCE(cs.published_at, cs.created_at) DESC`)
    .bind(...params)
    .all<Row>();
  return Promise.all(result.results.map(async (row) => {
    const metrics = await getCaseStudyMetrics(String(row.id));
    return mapCaseStudy(row, { metrics });
  }));
}

async function getCaseStudyMetrics(caseStudyId: string): Promise<CaseStudyMetric[]> {
  const db = await getDb();
  const result = await db
    .prepare("SELECT * FROM case_study_metrics WHERE case_study_id = ? ORDER BY sort_order ASC")
    .bind(caseStudyId)
    .all<Row>();
  return result.results.map(mapMetric);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const db = await getDb();
  const result = await db.prepare("SELECT * FROM case_studies WHERE slug = ?").bind(slug).first<Row>();
  if (!result) return null;
  const metrics = await getCaseStudyMetrics(String(result.id));
  return mapCaseStudy(result, { metrics });
}

export async function getTestimonials(featuredOnly = false): Promise<Testimonial[]> {
  const db = await getDb();
  const result = await db
    .prepare("SELECT * FROM testimonials WHERE featured = ? ORDER BY sort_order ASC")
    .bind(featuredOnly ? 1 : 0)
    .all<Row>();
  return result.results.map(mapTestimonial);
}

export async function getLeads(): Promise<Lead[]> {
  const db = await getDb();
  const result = await db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all<Row>();
  return result.results.map(mapLead);
}

export async function getCampaigns(): Promise<Campaign[]> {
  const db = await getDb();
  const result = await db.prepare("SELECT * FROM campaigns ORDER BY created_at DESC").all<Row>();
  return result.results.map(mapCampaign);
}

export async function getSettings(): Promise<Record<string, SiteSetting>> {
  const db = await getDb();
  const result = await db.prepare("SELECT * FROM site_settings ORDER BY key ASC").all<Row>();
  return Object.fromEntries(result.results.map((row) => {
    const setting = mapSetting(row);
    return [setting.key, setting];
  }));
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const db = await getDb();
  const [publishedContent, drafts, caseStudies, leads, publishedCaseStudies, activity] = await Promise.all([
    db.prepare("SELECT COUNT(*) AS count FROM posts WHERE status = 'published'").first<Row>(),
    db.prepare("SELECT COUNT(*) AS count FROM posts WHERE status = 'draft'").first<Row>(),
    db.prepare("SELECT COUNT(*) AS count FROM case_studies").first<Row>(),
    db.prepare("SELECT COUNT(*) AS count FROM leads").first<Row>(),
    db.prepare("SELECT COUNT(*) AS count FROM case_studies WHERE status = 'published'").first<Row>(),
    db.prepare("SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 8").all<Row>(),
  ]);
  return {
    publishedContent: toNumber(publishedContent?.count),
    drafts: toNumber(drafts?.count),
    caseStudies: toNumber(caseStudies?.count),
    leads: toNumber(leads?.count),
    publishedCaseStudies: toNumber(publishedCaseStudies?.count),
    recentActivity: activity.results.map((row) => ({
      id: String(row.id),
      actorUserId: optionalString(row.actor_user_id),
      action: String(row.action),
      entityType: String(row.entity_type),
      entityId: optionalString(row.entity_id),
      metadata: safeJson(row.metadata_json),
      createdAt: String(row.created_at),
    })),
  };
}

function safeJson(value: unknown): Record<string, unknown> {
  if (typeof value !== "string") return {};
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}
