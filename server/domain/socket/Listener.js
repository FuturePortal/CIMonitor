const socketEvents = require('../../../shared/socketEvents');
const statusManager = require('../status/StatusManager');
const Config = require('../../config/Config');

class SocketListener {
    constructor() {
        const masterAddress = Config.getServerSlaveMaster();
        const socket = require('socket.io-client')(masterAddress);

        socket.on('connect', () => console.log(`[SocketListener] Connected to master ${masterAddress}.`));

        socket.on(socketEvents.eventTriggerStatus, rawStatus => this.triggerEventsForRawStatus(rawStatus));

        socket.on(socketEvents.statusesUpdated, rawStatuses => this.applyRawStatuses(rawStatuses));

        socket.on('disconnect', () => console.log(`[SocketListener] Disconnected from ${masterAddress}.`));
    }

    triggerEventsForRawStatus(rawStatus) {
        // @todo: Convert to status object and feed to the EventTrigger class
        console.log(`[SocketListener] Received raw status to trigger events.`);
    }

    applyRawStatuses(rawStatuses) {
        // @todo: Convert to status objects and put it in the status manager
        console.log(`[SocketListener] Received raw statuses to update the status manager.`);
    }
}

module.exports = new SocketListener();
