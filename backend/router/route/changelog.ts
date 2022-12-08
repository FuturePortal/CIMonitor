import express from 'express';

import { getChangelog } from 'backend/api/github';
import { Change } from 'types/cimonitor';

const router = express.Router();

router.get('/', async (request, response) => {
	try {
		const releases = await getChangelog();

		const changelog: Change[] = releases
			.filter((release) => release.tag_name.substring(0, 2) === '4.')
			.map((release) => ({
				version: release.tag_name,
				description: release.body,
			}));

		response.json(changelog);

		console.log(`[route/changelog] Served changelog.`);
	} catch (error) {
		response.status(500).json({ message: 'failed to get the changelog' });
		console.log(`[route/changelog] Failed to get the changelog.`);
	}
});

export default router;
