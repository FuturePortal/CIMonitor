import express from 'express';
import GitLabWebhook from 'types/gitlab';
import gitlabParser from 'backend/parser/gitlab';
import StatusManager from 'backend/status/manager';

const router = express.Router();

router.post('/', (request, response) => {
    console.log('[route/webhook/gitlab] Webhook received.');

    const gitlabWebhook: GitLabWebhook = request.body;

    switch (gitlabWebhook.object_kind) {
        case 'build':
            StatusManager.setStatus(gitlabParser.parseBuild(gitlabWebhook));
            break;
        case 'pipeline':
            StatusManager.setStatus(gitlabParser.parsePipeline(gitlabWebhook));
            break;
        case 'deployment':
            // TODO: See 60.json and 63.json
            console.log(`[route/webhook/gitlab] Deployment webhooks are not yet supported.`);
            break;
        default:
            console.log(`[route/webhook/gitlab] No parser for webhook type ${gitlabWebhook.object_kind}.`);
    }

    response.json({ message: 'thanks' });
});

export default router;
