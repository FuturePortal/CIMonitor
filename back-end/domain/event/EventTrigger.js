const Config = require('../../config/ConfigLoaderFactory')
    .getLoader()
    .getConfig();
const ModuleManager = require('../module/ModuleManager');
const Events = require('../Events');

class EventTrigger {
    /**
     * @param {Status} status
     */
    fireStatus(status) {
        const triggers = Config.getTriggers();
        console.log(`[EventTrigger] Checking if status ${status.getKey()} triggers any events...`);

        Events.push(Events.event.eventTriggerStatus, status);

        triggers.forEach(trigger => this.triggerEventIfMatch(trigger.on, status, trigger.targetEventName));
    }

    /**
     * @param {Object} triggerData
     * @param {Status} status
     * @param {string} targetEventName
     */
    triggerEventIfMatch(triggerData, status, targetEventName) {
        const statusData = status.getRawData();
        for (let triggerKey of Object.keys(triggerData)) {
            if (triggerData[triggerKey] !== statusData[triggerKey]) {
                console.log(`[EventTrigger] No match for event ${targetEventName}.`);
                return;
            }
        }

        this.fireModulesForEvent(targetEventName, status);
    }

    /**
     * @param {string} eventName
     * @param {Status} status
     */
    fireModulesForEvent(eventName, status) {
        console.log(`[EventTrigger] Firing modules for ${eventName}...`);

        const event = Config.getEventByName(eventName);

        if (!Array.isArray(event.modules)) {
            return;
        }

        event.modules.forEach(module => ModuleManager.fireModuleEvent(module.name, module.push, status));
    }
}

module.exports = new EventTrigger();
