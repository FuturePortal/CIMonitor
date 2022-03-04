import express from 'express';

import GitLabRouter from './webhook/gitlab';
import GitHubRouter from './webhook/github';

const router = express.Router();

router.use((request, response, next) => {
    // TODO: catch all webhook calls and save them
    console.log('[route/webhook] Caught webhook call.');

    next();
});

router.use('/gitlab', GitLabRouter);
router.use('/github', GitHubRouter);

export default router;
