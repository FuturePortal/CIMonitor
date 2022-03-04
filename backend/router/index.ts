import dashboardRouter from './route/dashboard';
import webhookRouter from './route/webhook';

import express from 'express';

const router = express.Router();

router.use('/', dashboardRouter);
router.use('/webhook', webhookRouter);

export default router;
