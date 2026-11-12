import { Router } from 'express';
import * as controller from '../controllers/submissions.controller';
import { validate } from '../middlewares/validate';
import { idParamSchema } from '../validators/common';
import {
  createSubmissionSchema,
  patchSubmissionSchema,
  updateSubmissionSchema,
} from '../validators/submissions';

const router = Router();

router.get('/', controller.list);
router.post('/', validate({ body: createSubmissionSchema }), controller.create);
router.get('/:id', validate({ params: idParamSchema }), controller.getById);
router.put(
  '/:id',
  validate({ params: idParamSchema, body: updateSubmissionSchema }),
  controller.update,
);
router.patch(
  '/:id',
  validate({ params: idParamSchema, body: patchSubmissionSchema }),
  controller.patch,
);
router.delete('/:id', validate({ params: idParamSchema }), controller.remove);

export default router;
