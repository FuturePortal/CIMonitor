import express from 'express';

import StatusManager from 'backend/status/manager';

const router = express.Router();

function isPasswordRequired(): boolean {
	const dashboardPassword = process.env.DASHBOARD_PASSWORD || '';
	return dashboardPassword !== '';
}

function verifyPassword(request: express.Request, response: express.Response): boolean {
	if (!isPasswordRequired()) {
		return true;
	}

	const dashboardPassword = process.env.DASHBOARD_PASSWORD || '';
	const authorizationHeader = request.headers.authorization || '';

	if (authorizationHeader === dashboardPassword) {
		return true;
	}

	response.status(401).json({ error: 'Unauthorized' });
	return false;
}

router.delete('/all', async (request, response) => {
	if (!verifyPassword(request, response)) {
		return;
	}

	console.log(`[route/status] Deleting ALL statuses.`);

	StatusManager.deleteAllStatuses();

	return response.json({ message: `Deleted all statuses.` });
});

router.delete('/:id', async (request, response) => {
	if (!verifyPassword(request, response)) {
		return;
	}

	console.log(`[route/status] Deleting status ${request.params.id}.`);

	StatusManager.deleteStatus(request.params.id);

	return response.json({ message: `Deleted status ${request.params.id}.` });
});

export default router;
