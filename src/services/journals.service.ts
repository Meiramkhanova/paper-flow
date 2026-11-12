import { prisma } from '../prisma/client';
import { NotFoundError } from '../errors/AppError';

type JournalInput = {
  name: string;
  publisher: string;
  website: string;
  subjectArea: string;
};

export async function listJournals() {
  return prisma.journal.findMany({ orderBy: { id: 'asc' } });
}

export async function getJournalById(id: number) {
  const journal = await prisma.journal.findUnique({ where: { id } });
  if (!journal) throw new NotFoundError('Journal', id);
  return journal;
}

export async function createJournal(data: JournalInput) {
  return prisma.journal.create({ data });
}

export async function updateJournal(id: number, data: JournalInput) {
  await getJournalById(id);
  return prisma.journal.update({ where: { id }, data });
}

export async function deleteJournal(id: number) {
  await getJournalById(id);
  await prisma.journal.delete({ where: { id } });
}

export async function getRequirementsByJournal(journalId: number) {
  await getJournalById(journalId);
  return prisma.journalRequirement.findMany({
    where: { journalId },
    orderBy: { id: 'asc' },
  });
}

export async function getSubmissionsByJournal(journalId: number) {
  await getJournalById(journalId);
  return prisma.submission.findMany({
    where: { journalId },
    orderBy: { submittedAt: 'desc' },
    include: { manuscript: true },
  });
}
