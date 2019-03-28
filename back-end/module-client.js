const ConfigLoader = require('./config/ConfigLoaderFactory').getLoader();
const ModuleManager = require('./domain/module/ModuleManager');
const SocketListener = require('./domain/socket/Listener');

(async () => {
    await ConfigLoader.loadConfig();
    ModuleManager.initModulesFromConfig();
    SocketListener.connectAndListen();
})();
