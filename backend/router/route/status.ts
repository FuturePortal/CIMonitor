import express from 'express';

import StatusManager from 'backend/status/manager';

const router = express.Router();

router.delete('/all', async (request, response) => {
    console.log(`[route/status] Deleting ALL statuses.`);

    StatusManager.deleteAllStatuses();

    return response.json({ message: `Deleted all statuses.` });
});

router.delete('/:id', async (request, response) => {
    console.log(`[route/status] Deleting status ${request.params.id}.`);

    StatusManager.deleteStatus(request.params.id);

    return response.json({ message: `Deleted status ${request.params.id}.` });
});

export default router;
