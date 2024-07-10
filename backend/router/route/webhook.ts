import express from 'express';
import FileSystem from 'fs';
import { IncomingHttpHeaders } from 'http';

import BitBucketRouter from './webhook/bitbucket';
import GitHubRouter from './webhook/github';
import GitLabRouter from './webhook/gitlab';
import ReadTheDocsRouter from './webhook/readthedocs';

const router = express.Router();

const cleanHeaders = (headers: IncomingHttpHeaders): IncomingHttpHeaders => {
	const headersToClean = [
		'accept',
		'accept-encoding',
		'baggage',
		'connection',
		'content-length',
		'host',
		'newrelic',
		'sentry-trace',
		'traceparent',
		'tracestate',
		'x-attempt-number',
		'x-b3-parentspanid',
		'x-b3-sampled',
		'x-b3-spanid',
		'x-b3-traceid',
		'x-forwarded-for',
		'x-forwarded-host',
		'x-forwarded-port',
		'x-forwarded-proto',
		'x-forwarded-scheme',
		'x-forwarded-server',
		'x-github-delivery',
		'x-github-hook-id',
		'x-github-hook-installation-target-id',
		'x-github-hook-installation-target-type',
		'x-gitlab-event-uuid',
		'x-hook-uuid',
		'x-hub-signature',
		'x-hub-signature-256',
		'x-real-ip',
		'x-request-uuid',
		'x-scheme',
	];

	for (let headerToClean of headersToClean) {
		delete headers[headerToClean];
	}

	return headers;
};

let recordCount = 0;

const shouldPersist = (request: express.Request): boolean => {
	if (process.env.PERSIST_WEBHOOKS !== 'true') {
		return false;
	}

	return !('x-dont-persist' in request.headers);
};

// Save the incoming webhook body if requested in the environment variables
router.use((request, response, next) => {
	if (shouldPersist(request)) {
		recordCount++;
		const date = new Date();
		const pad = (number: number) => number.toString().padStart(2, '0');
		const pathParts = [
			'webhooks',
			request.url,
			`/${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
		];
		let path = '';
		for (let pathPart of pathParts) {
			path += pathPart;
			if (!FileSystem.existsSync(path)) {
				FileSystem.mkdirSync(path);
			}
		}
		const file = `${path}/${recordCount}.json`;
		const body = {
			headers: cleanHeaders(request.headers),
			body: request.body,
		};
		FileSystem.writeFileSync(file, JSON.stringify(body, null, 4));
		console.log(`[route/webhook] Saved ${file}.`);
	}

	next();
});

router.use('/bitbucket', BitBucketRouter);
router.use('/github', GitHubRouter);
router.use('/gitlab', GitLabRouter);
router.use('/readthedocs', ReadTheDocsRouter);

export default router;
