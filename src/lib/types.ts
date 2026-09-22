export type ID = string;

export type Status = "draft" | "published" | "archived";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed";
export type CampaignStatus = "planning" | "active" | "paused" | "completed";
export type UserRole = "admin" | "editor";

export interface User {
  id: ID;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: ID;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
}

export interface Service {
  id: ID;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Media {
  id: ID;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  r2Key: string;
  url: string;
  altText: string;
  createdAt: string;
}

export interface Post {
  id: ID;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  categoryId: ID;
  category?: Category;
  authorId: ID;
  author?: Pick<User, "id" | "displayName" | "email">;
  coverMediaId?: ID;
  cover?: Media | null;
  status: Status;
  seoTitle: string;
  seoDescription: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudyMetric {
  id: ID;
  caseStudyId: ID;
  label: string;
  value: string;
  sortOrder: number;
}

export interface CaseStudy {
  id: ID;
  slug: string;
  client: string;
  title: string;
  serviceCategory: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  testimonial: string;
  coverMediaId?: ID;
  cover?: Media | null;
  featured: boolean;
  status: Status;
  metrics: CaseStudyMetric[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: ID;
  name: string;
  role: string;
  company: string;
  quote: string;
  caseStudyId?: ID;
  featured: boolean;
  sortOrder: number;
}

export interface Lead {
  id: ID;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface Campaign {
  id: ID;
  name: string;
  service: string;
  status: CampaignStatus;
  objective: string;
  budgetCents: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  valueType: "string" | "number" | "boolean" | "json";
  updatedAt: string;
}

export interface SeoMetadata {
  id: ID;
  pageKey: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  twitterCard: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: ID;
  actorUserId?: ID;
  action: string;
  entityType: string;
  entityId?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiError {
  ok: false;
  error: {
    code: string;
    message: string;
    issues?: Array<{ path: string[]; message: string }>;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface DashboardOverview {
  publishedContent: number;
  drafts: number;
  caseStudies: number;
  leads: number;
  publishedCaseStudies: number;
  recentActivity: ActivityLog[];
}
