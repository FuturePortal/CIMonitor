import express from 'express';

import GitLabParser from 'backend/parser/gitlab';
import StatusManager from 'backend/status/manager';
import GitLabWebhook from 'types/gitlab';
import Status from 'types/status';

import verifySimpleSecret from './verify-secret';

const router = express.Router();

const verifyGitLabSecret = (request: express.Request): boolean => {
	const webhookSecret = process.env.WEBHOOK_SECRET;

	if (!webhookSecret) {
		return true;
	}

	if (request.headers['x-gitlab-token'] === webhookSecret) {
		return true;
	}

	return verifySimpleSecret(request);
};

router.post('/', (request, response) => {
	console.log('[route/webhook/gitlab] Webhook received.');

	if (!verifyGitLabSecret(request)) {
		console.log('[route/webhook/gitlab] Invalid webhook secret.');
		return response.status(403).json({ message: 'Invalid secret verification.' });
	}

	const gitlabWebhook: GitLabWebhook = request.body;

	let status: Status | null = null;

	switch (gitlabWebhook.object_kind) {
		case 'build':
			status = GitLabParser.parseBuild(gitlabWebhook);
			break;
		case 'pipeline':
			status = GitLabParser.parsePipeline(gitlabWebhook);
			break;
		case 'deployment':
			status = GitLabParser.parseDeployment(gitlabWebhook);
			break;
		case 'merge_request':
			status = GitLabParser.parseMergeRequest(gitlabWebhook);
			break;
		default:
			console.log(`[route/webhook/gitlab] No parser for webhook type ${gitlabWebhook.object_kind}.`);
	}

	if (status !== null) {
		StatusManager.setStatus(status);
	}

	response.json({ message: 'thanks' });
});

export default router;
