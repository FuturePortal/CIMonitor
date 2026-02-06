import express from 'express';

const getWebhookSecret = (): string | null => {
	return process.env.WEBHOOK_SECRET || null;
};

const verifySimpleSecret = (request: express.Request): boolean => {
	const webhookSecret = getWebhookSecret();

	if (!webhookSecret) {
		return true;
	}

	if (request.headers['authorization'] === webhookSecret) {
		return true;
	}

	if (request.headers['x-secret-token'] === webhookSecret) {
		return true;
	}

	if (request.headers['x-gitlab-token'] === webhookSecret) {
		return true;
	}

	if (request.query.secret === webhookSecret) {
		return true;
	}

	return false;
};

export { verifySimpleSecret };
