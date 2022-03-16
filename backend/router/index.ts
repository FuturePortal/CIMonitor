import express from 'express';

import dashboardRouter from './route/dashboard';
import webhookRouter from './route/webhook';

const router = express.Router();

router.use('/', dashboardRouter);
router.use('/webhook', webhookRouter);

export default router;
