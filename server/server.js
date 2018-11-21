const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const Config = require('./config/Config');
const router = require('./routes');
const ModuleManager = require('./domain/module/ModuleManager');
const SocketConnectionManager = require('./domain/socket/ConnectionManager');

const app = express();
app.use(bodyParser.json());
app.use(router);
const server = http.createServer(app);

SocketConnectionManager.startSocketServer(server);

ModuleManager.initModulesFromConfig();

server.listen(Config.getServerPort(), () => {
    console.log(`[server] Running and listening on port ${Config.getServerPort()}...`);
});
