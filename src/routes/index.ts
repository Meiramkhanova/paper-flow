import { Router } from 'express';
import researchersRoutes from './researchers.routes';
import manuscriptsRoutes from './manuscripts.routes';
import journalsRoutes from './journals.routes';
import requirementsRoutes from './requirements.routes';
import submissionsRoutes from './submissions.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'PaperFlow' });
});

router.use('/researchers', researchersRoutes);
router.use('/manuscripts', manuscriptsRoutes);
router.use('/journals', journalsRoutes);
router.use('/requirements', requirementsRoutes);
router.use('/submissions', submissionsRoutes);

export default router;
