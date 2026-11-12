import { z } from 'zod';

export const createRequirementSchema = z.object({
  title: z.string().trim().min(1, 'title is required'),
  description: z.string().trim().min(1, 'description is required'),
  isMandatory: z.boolean().optional().default(true),
});

export const updateRequirementSchema = z.object({
  title: z.string().trim().min(1, 'title is required'),
  description: z.string().trim().min(1, 'description is required'),
  isMandatory: z.boolean(),
});

export const patchRequirementSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    isMandatory: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
