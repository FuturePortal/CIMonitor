import dashboardRouter from './route/dashboard';

import express from 'express';

const router = express.Router();

router.use('/', dashboardRouter);

export default router;
