import express from 'express';

const router = express.Router();

router.post('/validate', (request, response) => {
	const dashboardPassword = process.env.DASHBOARD_PASSWORD || '';

	if (!dashboardPassword) {
		return response.status(401).json({ valid: false, reason: 'Dashboard password is not set.' });
	}

	const providedPassword = request.body.password || '';

	if (providedPassword === dashboardPassword) {
		return response.json({ valid: true });
	}

	return response.status(401).json({ valid: false, reason: 'Invalid password.' });
});

export default router;
