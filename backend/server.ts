import bodyParser from 'body-parser';
import express from 'express';
import { createServer } from 'http';

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

StatusManager.init();

StorageManager.init();

ConnectionManager.startSocket(server);

server.listen(port, () => {
    console.log(`[server] CIMonitor running on port ${port}.`);
});
