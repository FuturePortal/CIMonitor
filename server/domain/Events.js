const events = require('events');
const eventEmitter = new events.EventEmitter();

class Events {
    constructor() {
        this.setEvents();
    }

    setEvents() {
        this.event = {
            newStatus: 'new-status',
            statusesUpdated: 'statuses-updated',
        };
    }

    push(eventName, ...data) {
        console.log(`[Events] Pushing ${eventName}...`);

        eventEmitter.emit(eventName, ...data);
    }

    watch(eventName, eventHandler) {
        console.log(`[Events] Watching ${eventName}...`);

        eventEmitter.on(eventName, eventHandler);
    }

    waitFor(eventName, eventHandler) {
        console.log(`[Events] Waiting for ${eventName}...`);

        eventEmitter.once(eventName, eventHandler);
    }
}

module.exports = new Events();
