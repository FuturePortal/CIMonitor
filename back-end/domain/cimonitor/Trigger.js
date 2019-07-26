const ModuleManager = require('../module/ModuleManager.js');
const EventTrigger = require('../event/EventTrigger.js');
const Config = require('../../config/ConfigLoaderFactory')
    .getLoader()
    .getConfig();

class Trigger {
    event(eventName) {
        console.log(`[Trigger] Triggered event ${eventName}...`);

        if (Config.getEventByName(eventName)) {
            EventTrigger.fireModulesForEvent(eventName, null);
            return;
        }

        console.log(`[Trigger] Event ${eventName} is not defined for this machine.`);
    }

    module(moduleName, pushConfig) {
        console.log(`[Trigger] Triggered module ${moduleName}...`);

        if (ModuleManager.isModuleInitialized(moduleName)) {
            ModuleManager.fireModuleEvent(moduleName, pushConfig, null);
            return;
        }

        console.log(`[Trigger] Module ${moduleName} doesn't exist or is not initialized for this machine.`);
    }
}

module.exports = new Trigger();
