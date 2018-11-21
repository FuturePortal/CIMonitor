const Events = require('../Events');
const socketEvents = require('../../../shared/socketEvents');
const statusManager = require('../status/StatusManager');

class SocketConnectionManager {
    constructor() {
        this.io = null;

        this.setListeners();
    }

    setListeners() {
        Events.watch(Events.event.statusesUpdated, () => this.onStatusesUpdated());

        Events.watch(Events.event.eventTriggerStatus, status => this.onEventTriggerStatus(status));

        console.log('[SocketConnectionManager] Listening to status list updates...');
    }

    setSocketServer(server) {
        this.io = require('socket.io')(server);
    }

    /**
     * Make sure the newly connected client receives the latest statuses
     */
    startListening() {
        this.io.on('connect', socket => {
            console.log('[SocketConnectionManager] A client connected.');

            socket.emit(socketEvents.statusesUpdated, statusManager.getRawStatuses());
        });
    }

    /**
     * Push the latest statuses to all connected clients
     */
    onStatusesUpdated() {
        if (!this.io) {
            // No socket connection is established, no need to emit anything
            return;
        }

        this.io.sockets.emit(socketEvents.statusesUpdated, statusManager.getRawStatuses());
    }

    /**
     * Push the latest statuses to all connected clients
     *
     * @param {Status} status
     */
    onEventTriggerStatus(status) {
        if (!this.io) {
            // No socket connection is established, no need to emit anything
            return;
        }

        this.io.sockets.emit(socketEvents.eventTriggerStatus, status.getRawData());
    }

    /**
     * Push a video to all connected clients
     *
     * @param {Object} videoDetails
     */
    pushVideo(videoDetails) {
        if (!this.io) {
            // No socket connection is established, no need to emit anything
            console.log(`[SocketConnectionManager] No socket connection. Videos can't be pushed on server-slaves.`);
            return;
        }

        this.io.sockets.emit(socketEvents.playVideo, videoDetails);
    }
}

module.exports = new SocketConnectionManager();
