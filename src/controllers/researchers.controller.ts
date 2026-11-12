import { NextFunction, Request, Response } from 'express';
import * as researchersService from '../services/researchers.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await researchersService.listResearchers();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await researchersService.getResearcherById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await researchersService.createResearcher(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await researchersService.updateResearcher(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await researchersService.deleteResearcher(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listManuscripts(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await researchersService.getManuscriptsByResearcher(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
