const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const ConfigLoader = require('./config/LoaderFactory').getLoader();
const ModuleManager = require('./domain/module/ModuleManager');
const SocketConnectionManager = require('./domain/socket/ConnectionManager');
const StatusPersister = require('./domain/status/PersisterFactory').getPersister();
const VersionChecker = require('./domain/cimonitor/VersionChecker');
const router = require('./routes');

(async () => {
    await ConfigLoader.loadConfig();
    await ModuleManager.initModulesFromConfig();
    await StatusPersister.loadSavedStatuses();

    const Config = ConfigLoader.getConfig();
    const app = express();
    app.use(bodyParser.json());
    app.use(router);
    const server = http.createServer(app);

    SocketConnectionManager.startSocketServer(server);

    VersionChecker.scheduleVersionChecks();

    server.listen(Config.getServerPort(), () => {
        console.log(`[server] Running and listening on port ${Config.getServerPort()}...`);
    });
})();
