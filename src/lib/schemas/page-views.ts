// lib/schemas/page-views.ts
import { z } from "zod";

// Database schema
export const PageViewSchema = z.object({
  id: z.number(),
  page: z.string(),
  views: z.number().min(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// API request schemas
export const ViewRequestSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

export const ViewResponseSchema = z.object({
  views: z.number().min(0),
});

// Error response schema
export const ErrorResponseSchema = z.object({
  error: z.string(),
});

// Types
export type PageView = z.infer<typeof PageViewSchema>;
export type ViewRequest = z.infer<typeof ViewRequestSchema>;
export type ViewResponse = z.infer<typeof ViewResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
