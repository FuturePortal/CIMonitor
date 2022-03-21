import express from 'express';
import FileSystem from 'fs';
import { IncomingHttpHeaders } from 'http';

import GitHubRouter from './webhook/github';
import GitLabRouter from './webhook/gitlab';
import ReadTheDocsRouter from './webhook/readthedocs';

const router = express.Router();

const cleanHeaders = (headers: IncomingHttpHeaders): IncomingHttpHeaders => {
    const headersToClean = [
        'x-gitlab-event-uuid',
        'connection',
        'host',
        'content-length',
        'accept',
        'x-github-delivery',
        'x-github-hook-id',
        'x-github-hook-installation-target-id',
        'x-github-hook-installation-target-type',
        'x-hub-signature',
        'x-hub-signature-256',
    ];

    for (let headerToClean of headersToClean) {
        delete headers[headerToClean];
    }

    return headers;
};

let recordCount = 0;

const shouldPersist = (request: express.Request): boolean => {
    if (process.env.PERSIST_WEBHOOKS !== 'true') {
        return false;
    }

    return !('x-dont-persist' in request.headers);
};

// Save the incoming webhook body if requested in the environment variables
router.use((request, response, next) => {
    if (shouldPersist(request)) {
        recordCount++;
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
        const file = `${path}/${new Date().getTime()}-${recordCount}.json`;
        const body = {
            headers: cleanHeaders(request.headers),
            body: request.body,
        };
        FileSystem.writeFileSync(file, JSON.stringify(body, null, 4));
        console.log(`[route/webhook] Saved ${file}.`);
    }

    next();
});

router.use('/gitlab', GitLabRouter);
router.use('/github', GitHubRouter);
router.use('/readthedocs', ReadTheDocsRouter);

export default router;
