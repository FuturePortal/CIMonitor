import express from 'express';

import { getContributors } from 'backend/api/github';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const contributors = await getContributors();

        response.json(contributors);

        console.log(`[route/contributors] Served contributors.`);
    } catch (error) {
        response.status(500).json({ message: 'failed to get the contributors' });
        console.log(`[route/contributors] Failed to get the contributors.`);
    }
});

export default router;
