import express from 'express';

const router = express.Router();

// TODO: process GitHub calls
router.post('/', (request, response) => {
    console.log('[route/webhook/github] Webhook posted.');

    response.json({ message: 'thanks' });
});

export default router;
