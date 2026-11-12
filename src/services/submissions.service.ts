import { SubmissionStatus } from '@prisma/client';
import { prisma } from '../prisma/client';
import { NotFoundError } from '../errors/AppError';
import { getManuscriptById } from './manuscripts.service';
import { getJournalById } from './journals.service';

type SubmissionInput = {
  manuscriptId: number;
  journalId: number;
  status: SubmissionStatus;
  submittedAt?: Date;
  editorComment?: string | null;
};

type SubmissionPatch = Partial<SubmissionInput>;

async function assertRelations(manuscriptId: number, journalId: number) {
  await getManuscriptById(manuscriptId);
  await getJournalById(journalId);
}

export async function listSubmissions() {
  return prisma.submission.findMany({
    orderBy: { id: 'asc' },
    include: { manuscript: true, journal: true },
  });
}

export async function getSubmissionById(id: number) {
  const submission = await prisma.submission.findUnique({
    where: { id },
    include: { manuscript: true, journal: true },
  });
  if (!submission) throw new NotFoundError('Submission', id);
  return submission;
}

export async function createSubmission(data: SubmissionInput) {
  await assertRelations(data.manuscriptId, data.journalId);
  return prisma.submission.create({
    data: {
      manuscriptId: data.manuscriptId,
      journalId: data.journalId,
      status: data.status,
      submittedAt: data.submittedAt,
      editorComment: data.editorComment ?? null,
    },
    include: { manuscript: true, journal: true },
  });
}

export async function updateSubmission(id: number, data: SubmissionInput) {
  await getSubmissionById(id);
  await assertRelations(data.manuscriptId, data.journalId);
  return prisma.submission.update({
    where: { id },
    data: {
      manuscriptId: data.manuscriptId,
      journalId: data.journalId,
      status: data.status,
      submittedAt: data.submittedAt,
      editorComment: data.editorComment ?? null,
    },
    include: { manuscript: true, journal: true },
  });
}

export async function patchSubmission(id: number, data: SubmissionPatch) {
  await getSubmissionById(id);

  if (data.manuscriptId !== undefined || data.journalId !== undefined) {
    const current = await getSubmissionById(id);
    await assertRelations(
      data.manuscriptId ?? current.manuscriptId,
      data.journalId ?? current.journalId,
    );
  }

  return prisma.submission.update({
    where: { id },
    data,
    include: { manuscript: true, journal: true },
  });
}

export async function deleteSubmission(id: number) {
  await getSubmissionById(id);
  await prisma.submission.delete({ where: { id } });
}
