import express from 'express';
import Status from 'types/status';
import StatusManager from 'backend/status/manager';
import githubParser from 'backend/parser/github';

const router = express.Router();

router.post('/', (request, response) => {
    console.log('[route/webhook/github] Webhook received.');

    const githubWebhookType: string = String(request.headers['x-github-event']);

    let status: Status | null = null;

    switch (githubWebhookType) {
        case 'push':
            status = githubParser.parsePush(request.body);
            break;
        case 'workflow_run':
            status = githubParser.parseWorkflowRun(request.body);
            break;
        case 'workflow_job':
            status = githubParser.parseWorkflowJob(request.body);
            break;
        case 'check_run':
            console.log(`[route/webhook/github] Webhook check_run has no added value and is ignored.`);
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