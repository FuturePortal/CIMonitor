import express from 'express';
import GitLabWebhook from 'types/gitlab';
import gitlabParser from 'backend/parser/gitlab';
import StatusManager from 'backend/statusses/StatusManager';

const router = express.Router();

router.post('/', (request, response) => {
    console.log('[route/webhook/gitlab] Webhook received.');

    const gitlabWebhook: GitLabWebhook = request.body;

    switch (gitlabWebhook.object_kind) {
        case 'build':
            StatusManager.setStatus(gitlabParser.parseBuild(gitlabWebhook));
            break;
        default:
            console.log(`[route/webhook/gitlab] No parser for webhook type ${gitlabWebhook.object_kind}.`);
    }

    response.json({ message: 'thanks' });
});

export default router;
