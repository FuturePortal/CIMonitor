const fileSystem = require('fs');

const Status = require('../status/Status');
const Config = require('../../config/Config');

class EventTrigger {
    /**
     * @param {Status} status
     */
    fireStatus(status) {
        const statusData = status.getRawData();
        const triggers = Config.getTriggers();
        console.log(`[EventTrigger] Checking if status ${status.getKey()} triggers any events...`);

        triggers.forEach(trigger => this.triggerEventIfMatch(trigger.on, statusData, trigger.targetEventName));
    }

    triggerEventIfMatch(triggerData, statusData, targetEventName) {
        for (let triggerKey of Object.keys(triggerData)) {
            if (triggerData[triggerKey] !== statusData[triggerKey]) {
                console.log(`[EventTrigger] No match for event ${targetEventName}.`);
                return;
            }
        }

        this.fireModulesForEvent(targetEventName);
    }

    fireModulesForEvent(eventName) {
        console.log(`[EventTrigger] Firing modules for ${eventName}...`);

        const event = Config.getEventByName(eventName);

        // @todo: Loop over all modules and trigger the event with the module specific config
    }
}

module.exports = new EventTrigger();
