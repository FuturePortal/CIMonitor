console.log('[CIMonitor] Started!');

const express = require('express');
const bodyParser = require('body-parser');

const Config = require('./config/Config');
const router = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(router);

const server = require('http').createServer(app);

const socketConnectionManager = require('./domain/dashboard/SocketConnectionManager');
socketConnectionManager.setSocketServer(server);
socketConnectionManager.startListening();

server.listen(Config.getServerPort(), () => {
    console.log(`[server] Running and listening on port ${Config.getServerPort()}...`);
});
