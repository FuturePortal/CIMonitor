import express from 'express';

const router = express.Router();

// TODO: process GitLab calls
router.post('/', (request, response) => {
    console.log('[route/webhook/gitlab] Webhook posted.');

    response.json({ message: 'thanks' });
});

export default router;
