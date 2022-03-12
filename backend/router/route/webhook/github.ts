import express from 'express';

const router = express.Router();

// TODO: process GitHub calls
router.post('/', (request, response) => {
    console.log('[route/webhook/github] Webhook received.');

    response.json({ message: 'thanks' });
});

export default router;
