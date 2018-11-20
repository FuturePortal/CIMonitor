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

        console.log('[SocketConnectionManager] Listening to status list updates...');
    }

    setSocketServer(server) {
        this.io = require('socket.io')(server);
    }

    /**
     * Make sure the newly connected dashboard receives the latest statuses
     */
    startListening() {
        this.io.on('connect', socket => {
            console.log('[SocketConnectionManager] A dashboard connected.');

            socket.emit(socketEvents.statusesUpdated, statusManager.getStatuses());
        });
    }

    /**
     * Push the latest statuses to all connected dashboards
     */
    onStatusesUpdated() {
        this.io.sockets.emit(socketEvents.statusesUpdated, statusManager.getStatuses());
    }

    /**
     * Push a video to all connected dashboards
     */
    pushVideo(videoDetails) {
        this.io.sockets.emit(socketEvents.playVideo, videoDetails);
    }
}

module.exports = new SocketConnectionManager();
