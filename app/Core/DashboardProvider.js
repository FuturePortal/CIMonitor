/**
 * @constructor
 * @param httpServer
 * @param dashboardSocket
 * @param eventHandler
 * @param statusManager
 */
var DashboardProvider = function(httpServer, dashboardSocket, eventHandler, statusManager) {
    /** {Server} */
    this.httpServer = httpServer;

    /** {http} */
    this.dashboardSocket = dashboardSocket;

    /** {EventEmitter} */
    this.eventHandler = eventHandler;

    /** {StatusManager} */
    this.statusManager = statusManager;

    /** {{Socket}} */
    this.dashboardSockets = {};

    /** @type {number} */
    this.socketId = 1;

    this.openDashboardSocket();

    this.attachStatusListener();
};

/**
 * Add the status listener
 */
DashboardProvider.prototype.attachStatusListener = function() {
    var DashboardProvider = this;

    this.eventHandler.on('status', function(status) {
        DashboardProvider.pushStatusToDashboards(status);
    });
};

/**
 * Opens the dashboard socket, and keeps list of the connected sockets
 */
DashboardProvider.prototype.openDashboardSocket = function() {
    var DashboardProvider = this;

    var socket  = this.dashboardSocket.listen(this.httpServer);
    socket.on('connection', function(socket) {
        var connectedSocked = socket;
        var socketId = DashboardProvider.socketId++;

        DashboardProvider.dashboardSockets[socketId] = connectedSocked;
        connectedSocked.emit('status', DashboardProvider.getDashboardStatuses());
        console.log(
            '[DashboardProvider] Dashboard connected with id ' + socketId + ' and has now the latest statuses.'
        );

        socket.on('disconnect', function () {
            console.log('[DashboardProvider] Dashboard disconnected with id ' + socketId + '.');
            delete DashboardProvider.dashboardSockets[socketId];
        });
    });
};

/**
 * Get all information form the statuses
 *
 * @returns {{hasStartedStatus: (*|bool|string), hasFailureStatus: (*|bool), statuses: Array}}
 */
DashboardProvider.prototype.getDashboardStatuses = function() {
    return {
        hasStartedStatus: this.statusManager.hasStartedStatus(),
        hasFailureStatus: this.statusManager.hasFailureStatus(),
        statuses: this.statusManager.getStatuses()
    };
};

/**
 * Pushes the statuses to the connected dashboards
 *
 * @param {object} status
 */
DashboardProvider.prototype.pushStatusToDashboards = function(status) {
    var dashboardStatuses = this.getDashboardStatuses();

    for (var id in this.dashboardSockets) {
        this.dashboardSockets[id].emit('status', dashboardStatuses);
        console.log('[DashboardProvider] Sent update to dashboard with id ' + id + '.');
    }
};

module.exports = DashboardProvider;
