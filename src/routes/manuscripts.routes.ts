import { Router } from 'express';
import * as controller from '../controllers/manuscripts.controller';
import { validate } from '../middlewares/validate';
import { idParamSchema } from '../validators/common';
import {
  createManuscriptSchema,
  patchManuscriptSchema,
  updateManuscriptSchema,
} from '../validators/manuscripts';

const router = Router();

router.get('/', controller.list);
router.post('/', validate({ body: createManuscriptSchema }), controller.create);
router.get('/:id', validate({ params: idParamSchema }), controller.getById);
router.put(
  '/:id',
  validate({ params: idParamSchema, body: updateManuscriptSchema }),
  controller.update,
);
router.patch(
  '/:id',
  validate({ params: idParamSchema, body: patchManuscriptSchema }),
  controller.patch,
);
router.delete('/:id', validate({ params: idParamSchema }), controller.remove);
router.get(
  '/:id/submissions',
  validate({ params: idParamSchema }),
  controller.listSubmissions,
);

export default router;
