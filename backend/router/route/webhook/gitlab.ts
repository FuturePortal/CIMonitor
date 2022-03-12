import express from 'express';
import GitLabWebhook from 'types/gitlab';
import gitlabParser from 'backend/parser/gitlab';

const router = express.Router();

// TODO: process GitLab calls
router.post('/', (request, response) => {
    console.log('[route/webhook/gitlab] Webhook received.');

    const gitlabWebhook: GitLabWebhook = request.body;

    switch (gitlabWebhook.object_kind) {
        case 'build':
            gitlabParser.parseBuild(gitlabWebhook);
            break;
        default:
            console.log(`[route/webhook/gitlab] No parser for webhook type ${gitlabWebhook.object_kind}.`);
    }

    response.json({ message: 'thanks' });
});

export default router;
