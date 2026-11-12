import { z } from 'zod';

export const createManuscriptSchema = z.object({
  title: z.string().trim().min(1, 'title is required'),
  abstract: z.string().trim().min(1, 'abstract is required'),
  keywords: z.array(z.string().trim().min(1)).min(1, 'At least one keyword is required'),
  language: z.string().trim().min(1, 'language is required'),
  researcherId: z.number().int().positive('researcherId must be a positive integer'),
});

export const updateManuscriptSchema = createManuscriptSchema;

export const patchManuscriptSchema = createManuscriptSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided' },
);
