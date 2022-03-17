import express from 'express';

const router = express.Router();

router.post('/', (request, response) => {
    console.log('[route/webhook/readthedocs] Webhook received.');

    response.json({ message: 'thanks' });
});

export default router;
