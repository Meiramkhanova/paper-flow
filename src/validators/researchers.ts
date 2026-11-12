import { z } from 'zod';

export const createResearcherSchema = z.object({
  fullName: z.string().trim().min(1, 'fullName is required'),
  email: z.string().trim().email('Invalid email format'),
  institution: z.string().trim().min(1, 'institution is required'),
});

export const updateResearcherSchema = createResearcherSchema;

export const patchResearcherSchema = createResearcherSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided' },
);
