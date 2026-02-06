import express from 'express';

import ReadTheDocsParser from 'backend/parser/readthedocs';
import StatusManager from 'backend/status/manager';
import ReadTheDocsBuild from 'types/readthedocs';

import { verifySimpleSecret } from './verify-secret';

const router = express.Router();

router.post('/', (request, response) => {
	console.log('[route/webhook/readthedocs] Webhook received.');

	if (!verifySimpleSecret(request)) {
		console.log('[route/webhook/readthedocs] Invalid webhook secret.');
		return response.status(403).json({ message: 'Invalid secret verification.' });
	}

	const webhook: ReadTheDocsBuild = request.body;

	let status = null;

	if (['build:triggered', 'build:failed', 'build:passed'].includes(webhook.event)) {
		status = ReadTheDocsParser.parseBuild(webhook);
	}

	if (status !== null) {
		StatusManager.setStatus(status);
	}

	response.json({ message: 'thanks' });
});

export default router;
