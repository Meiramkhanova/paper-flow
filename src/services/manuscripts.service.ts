import { prisma } from '../prisma/client';
import { NotFoundError } from '../errors/AppError';
import { getResearcherById } from './researchers.service';

type ManuscriptInput = {
  title: string;
  abstract: string;
  keywords: string[];
  language: string;
  researcherId: number;
};

type ManuscriptPatch = Partial<ManuscriptInput>;

export async function listManuscripts() {
  return prisma.manuscript.findMany({
    orderBy: { id: 'asc' },
    include: { researcher: true },
  });
}

export async function getManuscriptById(id: number) {
  const manuscript = await prisma.manuscript.findUnique({
    where: { id },
    include: { researcher: true },
  });
  if (!manuscript) throw new NotFoundError('Manuscript', id);
  return manuscript;
}

export async function createManuscript(data: ManuscriptInput) {
  await getResearcherById(data.researcherId);
  return prisma.manuscript.create({
    data,
    include: { researcher: true },
  });
}

export async function updateManuscript(id: number, data: ManuscriptInput) {
  await getManuscriptById(id);
  await getResearcherById(data.researcherId);
  return prisma.manuscript.update({
    where: { id },
    data,
    include: { researcher: true },
  });
}

export async function patchManuscript(id: number, data: ManuscriptPatch) {
  await getManuscriptById(id);
  if (data.researcherId !== undefined) {
    await getResearcherById(data.researcherId);
  }
  return prisma.manuscript.update({
    where: { id },
    data,
    include: { researcher: true },
  });
}

export async function deleteManuscript(id: number) {
  await getManuscriptById(id);
  await prisma.manuscript.delete({ where: { id } });
}

export async function getSubmissionsByManuscript(manuscriptId: number) {
  await getManuscriptById(manuscriptId);
  return prisma.submission.findMany({
    where: { manuscriptId },
    orderBy: { submittedAt: 'desc' },
    include: { journal: true },
  });
}
