const SocketClient = require('socket.io-client');

const socketEvents = require('../../../shared/socketEvents');
const Config = require('../../config/Config');
const EventTrigger = require('../event/EventTrigger');
const Status = require('../status/Status');
const StatusManager = require('../status/StatusManager');

class SocketListener {
    constructor() {
        const masterAddress = Config.getServerSlaveMaster();
        const socket = SocketClient(masterAddress);

        console.log(`[SocketListener] Connecting to master ${masterAddress}...`);
        socket.on('connect', () => console.log(`[SocketListener] Connected to master ${masterAddress}.`));

        socket.on(socketEvents.eventTriggerStatus, rawStatus => this.triggerEventsForRawStatus(rawStatus));
        socket.on(socketEvents.statusesUpdated, rawStatuses => this.applyRawStatuses(rawStatuses));

        socket.on('disconnect', () => console.log(`[SocketListener] Disconnected from ${masterAddress}.`));
    }

    triggerEventsForRawStatus(rawStatus) {
        console.log(`[SocketListener] Received raw status to trigger events.`);

        EventTrigger.fireStatus(Status.hydrateStatus(rawStatus));
    }

    applyRawStatuses(rawStatuses) {
        console.log(`[SocketListener] Received raw statuses to update the status manager.`);

        StatusManager.overwriteStatuses(rawStatuses.map(rawStatus => Status.hydrateStatus(rawStatus)));
    }
}

module.exports = new SocketListener();
