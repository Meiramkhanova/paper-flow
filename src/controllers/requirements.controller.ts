import { NextFunction, Request, Response } from 'express';
import * as requirementsService from '../services/requirements.service';

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await requirementsService.updateRequirement(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await requirementsService.deleteRequirement(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
