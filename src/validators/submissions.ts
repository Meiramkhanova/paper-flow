import { z } from 'zod';
import { submissionStatusSchema } from './common';

export const createSubmissionSchema = z.object({
  manuscriptId: z.number().int().positive('manuscriptId must be a positive integer'),
  journalId: z.number().int().positive('journalId must be a positive integer'),
  status: submissionStatusSchema.optional().default('DRAFT'),
  submittedAt: z.coerce.date().optional(),
  editorComment: z.string().trim().min(1).nullable().optional(),
});

export const updateSubmissionSchema = z.object({
  manuscriptId: z.number().int().positive(),
  journalId: z.number().int().positive(),
  status: submissionStatusSchema,
  submittedAt: z.coerce.date(),
  editorComment: z.string().trim().min(1).nullable(),
});

export const patchSubmissionSchema = z
  .object({
    manuscriptId: z.number().int().positive().optional(),
    journalId: z.number().int().positive().optional(),
    status: submissionStatusSchema.optional(),
    submittedAt: z.coerce.date().optional(),
    editorComment: z.string().trim().min(1).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
