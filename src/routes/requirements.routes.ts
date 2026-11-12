import { Router } from 'express';
import * as controller from '../controllers/requirements.controller';
import { validate } from '../middlewares/validate';
import { idParamSchema } from '../validators/common';
import { updateRequirementSchema } from '../validators/requirements';

const router = Router();

router.put(
  '/:id',
  validate({ params: idParamSchema, body: updateRequirementSchema }),
  controller.update,
);
router.delete('/:id', validate({ params: idParamSchema }), controller.remove);

export default router;
