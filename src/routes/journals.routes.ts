import { Router } from 'express';
import * as controller from '../controllers/journals.controller';
import { validate } from '../middlewares/validate';
import { idParamSchema } from '../validators/common';
import { createJournalSchema, updateJournalSchema } from '../validators/journals';
import { createRequirementSchema } from '../validators/requirements';

const router = Router();

router.get('/', controller.list);
router.post('/', validate({ body: createJournalSchema }), controller.create);
router.get('/:id', validate({ params: idParamSchema }), controller.getById);
router.put(
  '/:id',
  validate({ params: idParamSchema, body: updateJournalSchema }),
  controller.update,
);
router.delete('/:id', validate({ params: idParamSchema }), controller.remove);
router.get(
  '/:id/requirements',
  validate({ params: idParamSchema }),
  controller.listRequirements,
);
router.post(
  '/:id/requirements',
  validate({ params: idParamSchema, body: createRequirementSchema }),
  controller.createRequirement,
);
router.get(
  '/:id/submissions',
  validate({ params: idParamSchema }),
  controller.listSubmissions,
);

export default router;
