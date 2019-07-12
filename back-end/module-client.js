try {
    require('dotenv').config();
} catch (error) {
    // No dotenv package found...
}

(async () => {
    const ConfigLoader = require('./config/ConfigLoaderFactory').getLoader();
    await ConfigLoader.loadConfig();

    const ModuleManager = require('./domain/module/ModuleManager');
    await ModuleManager.initModulesFromConfig();

    const SocketListener = require('./domain/socket/Listener');
    SocketListener.connectAndListen();
})();
