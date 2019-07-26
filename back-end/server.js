const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

require('dotenv').config();

(async () => {
    const ConfigLoader = require('./config/ConfigLoaderFactory').getLoader();
    await ConfigLoader.loadConfig();

    const ModuleManager = require('./domain/module/ModuleManager');
    await ModuleManager.initModulesFromConfig();

    const StatusPersister = require('./domain/status/PersisterFactory').getPersister();
    await StatusPersister.loadSavedStatuses();

    const SocketConnectionManager = require('./domain/socket/ConnectionManager');
    const VersionChecker = require('./domain/cimonitor/VersionChecker');
    const router = require('./routes');

    const Config = await ConfigLoader.getConfig();

    const app = express();
    app.use(bodyParser.json());
    app.use(router);
    const server = http.createServer(app);

    SocketConnectionManager.startSocketServer(server);
    VersionChecker.scheduleVersionChecks();
    StatusPersister.saveStatusesOnChange();

    server.listen(Config.getServerPort(), () => {
        console.log(`[server] Running and listening on port ${Config.getServerPort()}...`);
    });
})();
