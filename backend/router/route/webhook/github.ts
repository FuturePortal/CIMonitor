import crypto from 'crypto';
import express from 'express';

import GitHubParser from 'backend/parser/github';
import StatusManager from 'backend/status/manager';
import Status from 'types/status';

const router = express.Router();

const verifyGitHubSignature = (request: express.Request): boolean => {
	const webhookSecret = process.env.WEBHOOK_SECRET;

	if (!webhookSecret) {
		return true;
	}

	const signature = request.headers['x-hub-signature-256'] as string;

	if (!signature) {
		return false;
	}

	const body = JSON.stringify(request.body);
	const hmac = crypto.createHmac('sha256', webhookSecret);
	hmac.update(body);
	const expectedSignature = `sha256=${hmac.digest('hex')}`;

	return crypto.timingSafeEqual(
		new Uint8Array(Buffer.from(signature)),
		new Uint8Array(Buffer.from(expectedSignature))
	);
};

router.post('/', (request, response) => {
	console.log('[route/webhook/github] Webhook received.');

	if (!verifyGitHubSignature(request)) {
		console.log('[route/webhook/github] Invalid webhook signature.');
		return response.status(403).json({ message: 'Invalid secret verification.' });
	}

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
