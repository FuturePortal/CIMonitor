const SocketClient = require('socket.io-client');

const socketEvents = require('../../../shared/socketEvents');
const Config = require('../../config/Config');
const EventTrigger = require('../event/EventTrigger');
const StatusFactory = require('../status/StatusFactory');
const StatusManager = require('../status/StatusManager');

class SocketListener {
    connectAndListen() {
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

        EventTrigger.fireStatus(StatusFactory.hydrateStatus(rawStatus));
    }

    applyRawStatuses(rawStatuses) {
        console.log(`[SocketListener] Received raw statuses to update the status manager.`);

        StatusManager.overwriteStatuses(rawStatuses.map(rawStatus => StatusFactory.hydrateStatus(rawStatus)));
    }
}

module.exports = new SocketListener();
