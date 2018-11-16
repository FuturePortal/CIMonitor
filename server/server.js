console.log('[CIMonitor] Started!');

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(router);

const server = require('http').createServer(app);

const socketConnectionManager = require('./domain/dashboard/SocketConnectionManager');
socketConnectionManager.setSocketServer(server);
socketConnectionManager.startListening();

server.listen(9999, () => {
    console.log('[server] Running and listening...');
});
