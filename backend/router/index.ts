import express from 'express';

import changelogRouter from './route/changelog';
import contributorRouter from './route/contributors';
import dashboardRouter from './route/dashboard';
import statusRouter from './route/status';
import versionRouter from './route/version';
import webhookRouter from './route/webhook';

const router = express.Router();

router.use('/', dashboardRouter);
router.use('/webhook', webhookRouter);
router.use('/version', versionRouter);
router.use('/contributors', contributorRouter);
router.use('/status', statusRouter);
router.use('/changelog', changelogRouter);

export default router;
