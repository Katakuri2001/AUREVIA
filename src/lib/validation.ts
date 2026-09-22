import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name.").max(100),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(2, "Tell us your company.").max(120),
  service: z.string().trim().min(2, "Choose a service.").max(100),
  message: z.string().trim().min(20, "Give us a little more detail.").max(3000),
  website: z.string().trim().max(0, "Spam check failed.").optional().default(""),
});

export const postInputSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  title: z.string().trim().min(3).max(160),
  excerpt: z.string().trim().min(20).max(400),
  body: z.string().trim().min(80).max(50000),
  categoryId: z.string().trim().min(1),
  coverMediaId: z.string().trim().min(1).optional().or(z.literal("")),
  seoTitle: z.string().trim().min(10).max(80),
  seoDescription: z.string().trim().min(20).max(180),
  status: z.enum(["draft", "published", "archived"]),
  publishedAt: z.string().datetime().optional().or(z.literal("")),
});

export const caseStudyInputSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  client: z.string().trim().min(2).max(120),
  title: z.string().trim().min(3).max(180),
  serviceCategory: z.string().trim().min(2).max(120),
  challenge: z.string().trim().min(40).max(5000),
  strategy: z.string().trim().min(40).max(5000),
  execution: z.string().trim().min(40).max(5000),
  results: z.string().trim().min(40).max(5000),
  testimonial: z.string().trim().min(20).max(2000),
  coverMediaId: z.string().trim().min(1).optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]),
  publishedAt: z.string().datetime().optional().or(z.literal("")),
  metrics: z.array(z.object({
    label: z.string().trim().min(1).max(80),
    value: z.string().trim().min(1).max(40),
  })).max(8).default([]),
});

export const mediaUploadSchema = z.object({
  altText: z.string().trim().max(300).optional().default(""),
});

export function validationIssues(error: z.ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.map(String),
    message: issue.message,
  }));
}
