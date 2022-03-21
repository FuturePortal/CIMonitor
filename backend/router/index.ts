import express from 'express';

import dashboardRouter from './route/dashboard';
import versionRouter from './route/version';
import webhookRouter from './route/webhook';

const router = express.Router();

router.use('/', dashboardRouter);
router.use('/webhook', webhookRouter);
router.use('/version', versionRouter);

export default router;
