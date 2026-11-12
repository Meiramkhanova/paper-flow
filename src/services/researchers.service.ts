import { prisma } from '../prisma/client';
import { ConflictError, NotFoundError } from '../errors/AppError';

type ResearcherInput = {
  fullName: string;
  email: string;
  institution: string;
};

export async function listResearchers() {
  return prisma.researcher.findMany({ orderBy: { id: 'asc' } });
}

export async function getResearcherById(id: number) {
  const researcher = await prisma.researcher.findUnique({ where: { id } });
  if (!researcher) throw new NotFoundError('Researcher', id);
  return researcher;
}

export async function createResearcher(data: ResearcherInput) {
  const existing = await prisma.researcher.findUnique({ where: { email: data.email } });
  if (existing) throw new ConflictError(`Email already exists: ${data.email}`);

  return prisma.researcher.create({ data });
}

export async function updateResearcher(id: number, data: ResearcherInput) {
  await getResearcherById(id);

  const existing = await prisma.researcher.findUnique({ where: { email: data.email } });
  if (existing && existing.id !== id) {
    throw new ConflictError(`Email already exists: ${data.email}`);
  }

  return prisma.researcher.update({ where: { id }, data });
}

export async function deleteResearcher(id: number) {
  await getResearcherById(id);
  await prisma.researcher.delete({ where: { id } });
}

export async function getManuscriptsByResearcher(researcherId: number) {
  await getResearcherById(researcherId);
  return prisma.manuscript.findMany({
    where: { researcherId },
    orderBy: { id: 'asc' },
  });
}
