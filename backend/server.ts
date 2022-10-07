import bodyParser from 'body-parser';
import express from 'express';
import { createServer } from 'http';

import ModuleManager from 'backend/module/manager';
import router from 'backend/router';
import ConnectionManager from 'backend/socket/manager';
import StatusManager from 'backend/status/manager';
import StorageManager from 'backend/storage/manager';

import 'dotenv/config';

const port = process.env.PORT || 3030;
const app = express();
const server = createServer(app);

app.use(bodyParser.json());

app.use(router);

(async () => {
	StorageManager.init();

	const statuses = await StorageManager.loadStatuses();

	if (statuses.length > 0) {
		StatusManager.setStatuses(statuses);
	}

	StatusManager.init();

	const { events, triggers } = await StorageManager.loadModules();

	ModuleManager.init(triggers, events);

	ConnectionManager.startSocket(server);

	server.listen(port, () => console.log(`[server] CIMonitor running on port ${port}.`));
})();
