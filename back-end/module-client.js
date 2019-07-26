require('dotenv').config();

(async () => {
    const ConfigLoader = require('./config/ConfigLoaderFactory').getLoader();
    await ConfigLoader.loadConfig();

    const ModuleManager = require('./domain/module/ModuleManager');
    await ModuleManager.initModulesFromConfig();

    const SocketListener = require('./domain/socket/Listener');
    SocketListener.connectAndListen();

    const TriggerListener = require('./domain/cimonitor/TriggerListener.js');
    TriggerListener.listenToEvents();
})();
