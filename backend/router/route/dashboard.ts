import express from 'express';
import fs from 'fs';
import path from 'path';

const dashboardPath = path.resolve('dashboard');

const router = express.Router();

function getPasswordProtectedSetting(): 'dashboard' | 'settings' | 'no' {
	const dashboardPassword = process.env.DASHBOARD_PASSWORD || '';
	if (!dashboardPassword) {
		return 'no';
	}

	const dashboardLock = process.env.DASHBOARD_LOCK || 'settings';
	if (dashboardLock === 'dashboard') {
		return 'dashboard';
	}

	return 'settings';
}

router.get('/robots.txt', (request, response) => {
	response.type('text/plain');
	response.send('User-agent: *\nDisallow: /');
});

router.get('/', (request, response) => {
	console.log(`[route/dashboard] Serving dashboard.`);

	const htmlPath = path.join(dashboardPath, 'index.html');
	const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

	const injectedScript = `<script>window.PASSWORD_PROTECTED = "${getPasswordProtectedSetting()}";</script>`;
	const modifiedHtml = htmlContent.replace('</head>', `\t${injectedScript}\n\t</head>`);

	response.send(modifiedHtml);
});

router.use(express.static(dashboardPath));

export default router;
