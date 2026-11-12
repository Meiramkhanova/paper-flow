import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const submissionStatusSchema = z.enum([
  'DRAFT',
  'SUBMITTED',
  'UNDER_REVIEW',
  'REVISION_REQUIRED',
  'ACCEPTED',
  'REJECTED',
  'WITHDRAWN',
]);
