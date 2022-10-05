import express from 'express';

import GitHubParser from 'backend/parser/github';
import StatusManager from 'backend/status/manager';
import Status from 'types/status';

const router = express.Router();

router.post('/', (request, response) => {
	console.log('[route/webhook/github] Webhook received.');

	const githubWebhookType: string = String(request.headers['x-github-event']);

	let status: Status | null = null;

	switch (githubWebhookType) {
		case 'push':
			status = GitHubParser.parsePush(request.body);
			break;
		case 'workflow_run':
			status = GitHubParser.parseWorkflowRun(request.body);
			break;
		case 'workflow_job':
			status = GitHubParser.parseWorkflowJob(request.body);
			break;
		case 'pull_request':
			status = GitHubParser.parsePullRequest(request.body);
			break;
		default:
			console.log(`[route/webhook/github] No parser for webhook type ${githubWebhookType}.`);
	}

	if (status !== null) {
		StatusManager.setStatus(status);
	}

	response.json({ message: 'thanks' });
});

export default router;
