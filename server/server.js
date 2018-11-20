const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const router = require('./routes');
const ModuleManager = require('./domain/module/ModuleManager');
const socketConnectionManager = require('./domain/dashboard/SocketConnectionManager');

const app = express();
app.use(bodyParser.json());
app.use(router);
const server = http.createServer(app);

socketConnectionManager.setSocketServer(server);
socketConnectionManager.startListening();

ModuleManager.initModulesFromConfig();

server.listen(9999, () => {
    console.log('[server] Running and listening...');
});
