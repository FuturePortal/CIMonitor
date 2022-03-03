import express from 'express';
import { createServer } from 'http';
import router from './router';
import StatusManager from './statusses/StatusManager';
import ConnectionManager from './socket/ConnectionManager';

const port = 3030;
const app = express();
const server = createServer(app);

app.use(router);

StatusManager.init();

ConnectionManager.startSocket(server);

server.listen(port, () => {
    console.log(`[server] CIMonitor running on port ${port}.`);
});
