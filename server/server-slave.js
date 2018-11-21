const ModuleManager = require('./domain/module/ModuleManager');
const SocketListener = require('./domain/socket/Listener');

ModuleManager.initModulesFromConfig();

SocketListener.connectAndListen();
