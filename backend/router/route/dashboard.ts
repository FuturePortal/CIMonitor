import express from 'express';
import path from 'path';

const dashboardPath = path.resolve('dashboard');

const router = express.Router();

router.get('/', (request, response) => {
	console.log(`[route/dashboard] Serving dashboard.`);
	response.sendFile(dashboardPath + '/index.html');
});

router.use(express.static(dashboardPath));

export default router;
