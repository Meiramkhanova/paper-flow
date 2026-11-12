import { Router } from 'express';
import * as controller from '../controllers/researchers.controller';
import { validate } from '../middlewares/validate';
import { idParamSchema } from '../validators/common';
import { createResearcherSchema, updateResearcherSchema } from '../validators/researchers';

const router = Router();

router.get('/', controller.list);
router.post('/', validate({ body: createResearcherSchema }), controller.create);
router.get('/:id', validate({ params: idParamSchema }), controller.getById);
router.put(
  '/:id',
  validate({ params: idParamSchema, body: updateResearcherSchema }),
  controller.update,
);
router.delete('/:id', validate({ params: idParamSchema }), controller.remove);
router.get(
  '/:id/manuscripts',
  validate({ params: idParamSchema }),
  controller.listManuscripts,
);

export default router;
