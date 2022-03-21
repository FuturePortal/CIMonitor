import express from 'express';

import GitHubAPI from 'backend/api/github';
import { GitHubRelease } from 'types/github';

const router = express.Router();

router.get('/', async (request, response) => {
    let latestVersion = null;
    const serverVersion = process.env.npm_package_version;

    try {
        const githubVersionInfo: GitHubRelease = await GitHubAPI.getLatestRelease();

        latestVersion = githubVersionInfo.tag_name;
    } catch (error) {
        console.log(`[route/version] Failed to fetch the latest version.`);
    }

    response.json({
        server: serverVersion,
        latest: latestVersion,
    });

    console.log(`[route/version] Returning server version ${serverVersion}, latest version is ${latestVersion}.`);
});

export default router;
