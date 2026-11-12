import { NextFunction, Request, Response } from 'express';
import * as journalsService from '../services/journals.service';
import * as requirementsService from '../services/requirements.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await journalsService.listJournals();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await journalsService.getJournalById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await journalsService.createJournal(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await journalsService.updateJournal(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await journalsService.deleteJournal(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listRequirements(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await journalsService.getRequirementsByJournal(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function createRequirement(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await requirementsService.createRequirement(id, req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function listSubmissions(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await journalsService.getSubmissionsByJournal(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
