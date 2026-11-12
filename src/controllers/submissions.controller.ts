import { NextFunction, Request, Response } from 'express';
import * as submissionsService from '../services/submissions.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await submissionsService.listSubmissions();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await submissionsService.getSubmissionById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await submissionsService.createSubmission(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await submissionsService.updateSubmission(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function patch(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await submissionsService.patchSubmission(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await submissionsService.deleteSubmission(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
