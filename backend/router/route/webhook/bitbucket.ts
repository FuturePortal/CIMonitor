import express from 'express';

import Parser from 'backend/parser/bitbucket';
import StatusManager from 'backend/status/manager';
import Status from 'types/status';

const router = express.Router();

router.post('/', (request, response) => {
	console.log('[route/webhook/bitbucket] Webhook received.');

	const webhookType: string = String(request.headers['x-event-key']);

	let status: Status | null = null;

	try {
		switch (webhookType) {
			case 'repo:push':
				status = Parser.parsePush(request.body);
				break;
			case 'pullrequest:created':
			case 'pullrequest:updated':
			case 'repo:commit_status_created':
			case 'repo:commit_status_updated':
			default:
				console.log(`[route/webhook/bitbucket] No parser for webhook type ${webhookType}.`);
		}

		if (status !== null) {
			StatusManager.setStatus(status);
		}

		response.json({ message: 'thanks' });
	} catch (error) {
		response.json({ message: 'thanks, although parsing failed.' });
	}
});

export default router;
