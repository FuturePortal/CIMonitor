const Config = require('./config/Config');
const ModuleManager = require('./domain/module/ModuleManager');

// @todo: Connect to the master server, and listen to in-coming statuses:
// SocketEvents.statusesUpdated; // Convert to status objects and put it in the status manager
// SocketEvents.eventTriggerStatus; // Convert to status object and feed to the EventTrigger class

socketEvents.ModuleManager.initModulesFromConfig();
