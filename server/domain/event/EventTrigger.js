const Status = require('../status/Status');
const Config = require('../../config/Config');
const ModuleManager = require('../module/ModuleManager');

class EventTrigger {
    /**
     * @param {Status} status
     */
    fireStatus(status) {
        const triggers = Config.getTriggers();
        console.log(`[EventTrigger] Checking if status ${status.getKey()} triggers any events...`);

        triggers.forEach(trigger => this.triggerEventIfMatch(trigger.on, status, trigger.targetEventName));
    }

    /**
     * @param {Status} status
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
     * @param {Status} status
     */
    fireModulesForEvent(eventName, status) {
        console.log(`[EventTrigger] Firing modules for ${eventName}...`);

        const event = Config.getEventByName(eventName);

        event.modules.forEach(module => ModuleManager.fireModuleEvent(module.name, module.push, status));
    }
}

module.exports = new EventTrigger();
