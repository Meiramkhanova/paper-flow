import { z } from 'zod';

export const createJournalSchema = z.object({
  name: z.string().trim().min(1, 'name is required'),
  publisher: z.string().trim().min(1, 'publisher is required'),
  website: z.string().trim().url('website must be a valid URL'),
  subjectArea: z.string().trim().min(1, 'subjectArea is required'),
});

export const updateJournalSchema = createJournalSchema;

export const patchJournalSchema = createJournalSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided' },
);
