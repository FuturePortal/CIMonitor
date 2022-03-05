import express from 'express';
import FileSystem from 'fs';

import GitLabRouter from './webhook/gitlab';
import GitHubRouter from './webhook/github';

const router = express.Router();

// Save the incoming webhook body if requested in the environment variables
router.use((request, response, next) => {
    if (process.env.PERSIST_WEBHOOKS === 'true') {
        const date = new Date();
        const pad = (number: number) => number.toString().padStart(2, '0');
        const pathParts = [
            'webhooks',
            request.url,
            `/${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
        ];
        let path = '';
        for (let pathPart of pathParts) {
            path += pathPart;
            if (!FileSystem.existsSync(path)) {
                FileSystem.mkdirSync(path);
            }
        }
        const file = `${path}/${new Date().getTime()}.json`;
        FileSystem.writeFileSync(file, JSON.stringify(request.body, null, 4));
        console.log(`[route/webhook] Saved ${file}.`);
    }

    next();
});

router.use('/gitlab', GitLabRouter);
router.use('/github', GitHubRouter);

export default router;