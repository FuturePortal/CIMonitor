import express from 'express';

import Parser from 'backend/parser/bitbucket';
import StatusManager from 'backend/status/manager';
import Status from 'types/status';

const router = express.Router();

router.post('/', (request, response) => {
	console.log('[route/webhook/bitbucket] Webhook received.');

	const webhookType: string = String(request.headers['x-event-key']);

	let status: Status | null = null;

	switch (webhookType) {
		case 'repo:push':
			status = Parser.parsePush(request.body);
			break;
		case 'repo:commit_status_created':
		case 'repo:commit_status_updated':
			status = Parser.parseBuild(request.body);
			break;
		case 'pullrequest:created':
		case 'pullrequest:updated':
			status = Parser.parsePullRequest(request.body);
			break;
		default:
			console.log(`[route/webhook/bitbucket] No parser for webhook type ${webhookType}.`);
	}

	if (status !== null) {
		StatusManager.setStatus(status);
	}

	response.json({ message: 'thanks' });
});

export default router;
