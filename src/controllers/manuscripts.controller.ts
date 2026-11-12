import { NextFunction, Request, Response } from 'express';
import * as manuscriptsService from '../services/manuscripts.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await manuscriptsService.listManuscripts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await manuscriptsService.getManuscriptById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await manuscriptsService.createManuscript(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await manuscriptsService.updateManuscript(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function patch(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await manuscriptsService.patchManuscript(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await manuscriptsService.deleteManuscript(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listSubmissions(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await manuscriptsService.getSubmissionsByManuscript(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
