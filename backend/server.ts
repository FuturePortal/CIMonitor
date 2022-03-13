import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import router from 'backend/router';
import StatusManager from 'backend/status/manager';
import ConnectionManager from 'backend/socket/manager';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3030;
const app = express();
const server = createServer(app);

app.use(bodyParser.json());

app.use(router);

StatusManager.init();

ConnectionManager.startSocket(server);

server.listen(port, () => {
    console.log(`[server] CIMonitor running on port ${port}.`);
});
