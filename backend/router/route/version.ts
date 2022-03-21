import express from 'express';

import GitHubAPI from 'backend/api/github';
import { GitHubRelease } from 'types/github';

const router = express.Router();

router.get('/', async (request, response) => {
    console.log(`[route/version] Returning versions.`);

    let latestVersion = null;

    try {
        const githubVersionInfo: GitHubRelease = await GitHubAPI.getLatestRelease();

        latestVersion = githubVersionInfo.tag_name;
    } catch (error) {
        console.log(`[route/version] Failed to fetch the latest version.`);
    }

    response.json({
        server: process.env.npm_package_version,
        latest: latestVersion,
    });
});

export default router;
