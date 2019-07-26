const Events = require('../Events');
const ModuleManager = require('../module/ModuleManager.js');
const EventTrigger = require('../event/EventTrigger.js');
const Config = require('../../config/ConfigLoaderFactory')
    .getLoader()
    .getConfig();

class TriggerListener {
    listenToEvents() {
        Events.watch(Events.event.triggerEvent, eventName => this.triggerEvent(eventName));
        Events.watch(Events.event.triggerModule, module => this.triggerModule(module));
        console.log(`[TriggerListener] Listening to trigger events...`);
    }

    triggerEvent(eventName) {
        console.log(`[TriggerListener] Received an event trigger, firing event ${eventName}!`);

        if (Config.getEventByName(eventName)) {
            EventTrigger.fireModulesForEvent(eventName, null);
            console.log(`[TriggerListener] Fired event ${eventName}.`);
            return;
        }

        console.log(`[TriggerListener] Event ${eventName} is not defined for this machine.`);
    }

    triggerModule(module) {
        console.log(`[TriggerListener] Received a module trigger, firing module ${module.name}...`);

        if (ModuleManager.isModuleInitialized(module.name)) {
            ModuleManager.fireModuleEvent(module.name, module.push, null);
            console.log(`[TriggerListener] Fired module ${module.name}.`);
            return;
        }

        console.log(`[TriggerListener] Module ${module.name} doesn't exist or is not initialized for this machine.`);
    }
}

module.exports = new TriggerListener();
