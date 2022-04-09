import express from 'express';

import GitLabParser from 'backend/parser/gitlab';
import StatusManager from 'backend/status/manager';
import GitLabWebhook from 'types/gitlab';
import Status from 'types/status';

const router = express.Router();

router.post('/', (request, response) => {
    console.log('[route/webhook/gitlab] Webhook received.');

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
