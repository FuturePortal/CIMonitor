const SocketClient = require('socket.io-client');

const socketEvents = require('../../../shared/socketEvents');
const ConfigLoader = require('../../config/ConfigLoaderFactory').getLoader();
const EventTrigger = require('../event/EventTrigger');
const Events = require('../Events.js');
const StatusFactory = require('../status/StatusFactory');
const StatusManager = require('../status/StatusManager');

class SocketListener {
    connectAndListen() {
        const Config = ConfigLoader.getConfig();
        const masterAddress = Config.getMaster();
        const socket = SocketClient(masterAddress);

        console.log(`[SocketListener] Connecting to master ${masterAddress}...`);
        socket.on('connect', () => console.log(`[SocketListener] Connected to master ${masterAddress}.`));

        socket.on(socketEvents.eventTriggerStatus, rawStatus => this.triggerEventsForRawStatus(rawStatus));
        socket.on(socketEvents.statusesUpdated, rawStatuses => this.applyRawStatuses(rawStatuses));
        socket.on(socketEvents.triggerEvent, eventName => this.triggerEvent(eventName));
        socket.on(socketEvents.triggerModule, module => this.triggerModule(module));

        socket.on('disconnect', () => console.log(`[SocketListener] Disconnected from ${masterAddress}.`));
    }

    triggerEventsForRawStatus(rawStatus) {
        console.log(`[SocketListener] Received raw status to trigger events.`);

        EventTrigger.fireStatus(StatusFactory.hydrateStatus(rawStatus));
    }

    applyRawStatuses(rawStatuses) {
        console.log(`[SocketListener] Received raw statuses to update the status manager.`);

        StatusManager.overwriteStatuses(rawStatuses.map(rawStatus => StatusFactory.hydrateStatus(rawStatus)));
    }

    triggerEvent(eventName) {
        console.log(`[SocketListener] Received event trigger for event ${eventName}.`);

        Events.push(Events.event.triggerEvent, eventName);
    }

    triggerModule(module) {
        console.log(`[SocketListener] Received module trigger for module ${module.name}.`);

        Events.push(Events.event.triggerModule, module);
    }
}

module.exports = new SocketListener();
