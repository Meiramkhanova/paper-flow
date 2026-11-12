import { prisma } from '../prisma/client';
import { NotFoundError } from '../errors/AppError';
import { getJournalById } from './journals.service';

type RequirementInput = {
  title: string;
  description: string;
  isMandatory: boolean;
};

type RequirementPatch = Partial<RequirementInput>;

export async function createRequirement(journalId: number, data: RequirementInput) {
  await getJournalById(journalId);
  return prisma.journalRequirement.create({
    data: { ...data, journalId },
  });
}

export async function getRequirementById(id: number) {
  const requirement = await prisma.journalRequirement.findUnique({ where: { id } });
  if (!requirement) throw new NotFoundError('JournalRequirement', id);
  return requirement;
}

export async function updateRequirement(id: number, data: RequirementInput) {
  await getRequirementById(id);
  return prisma.journalRequirement.update({ where: { id }, data });
}

export async function patchRequirement(id: number, data: RequirementPatch) {
  await getRequirementById(id);
  return prisma.journalRequirement.update({ where: { id }, data });
}

export async function deleteRequirement(id: number) {
  await getRequirementById(id);
  await prisma.journalRequirement.delete({ where: { id } });
}
