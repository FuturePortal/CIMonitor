/**
 * @constructor
 * @param httpServer
 * @param dashboardSocket
 * @param eventHandler
 * @param statusManager
 */
var DashboardProvider = function(httpServer, dashboardSocket, eventHandler, statusManager) {
    /**
     * {Server}
     */
    this.httpServer = httpServer;

    /**
     * {http}
     */
    this.dashboardSocket = dashboardSocket;

    /**
     * {EventEmitter}
     */
    this.eventHandler = eventHandler;

    /**
     * {StatusManager}
     */
    this.statusManager = statusManager;

    /** {{Socket}} */
    this.dashboardSockets = {};

    /**
     * The id that will be given and increased for every connected dashboard
     * @type {number}
     */
    this.socketId = 1;

    // Open dashboard socket
    this.openDashboardSocket();

    // Handle status updates
    var DashboardProvider = this;
    this.eventHandler.on('status', function(status) {
        DashboardProvider.pushStatusToDashboards(status);
    });
};

/**
 * Connects to the dashboard, and listens for incoming statuses
 */
DashboardProvider.prototype.openDashboardSocket = function() {
    var DashboardProvider = this;

    var socket  = this.dashboardSocket.listen(this.httpServer);
    socket.on('connection', function(socket) {
        var connectedSocked = socket;
        var socketId = DashboardProvider.socketId++;

        console.log('[DashboardProvider] Dashboard connected with id ' + socketId + '.');
        DashboardProvider.dashboardSockets[socketId] = connectedSocked;

        socket.on('disconnect', function () {
            console.log('[DashboardProvider] Dashboard with id ' + socketId + ' disconnected.');
            delete DashboardProvider.dashboardSockets[socketId];
        });
    });
};

/**
 * Pushes a new status to all connected dashboards
 *
 * @param {object} status
 */
DashboardProvider.prototype.pushStatusToDashboards = function(status) {
    var dashboardStatus = {
        hasStartedStatus: this.statusManager.hasStartedStatus(),
        hasFailureStatus: this.statusManager.hasFailureStatus(),
        statuses: this.statusManager.getStatuses()
    };

    for (var id in this.dashboardSockets) {
        this.dashboardSockets[id].emit('status', dashboardStatus);
        console.log('[DashboardProvider] Sent update to dashboard with id ' + id + '.');
    }
};

module.exports = DashboardProvider;
