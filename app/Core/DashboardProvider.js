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

    /** {} */
    this.dashboardSockets = {};

    this.openDashboardSocket();

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
        console.log('[DashboardProvider] Dashboard connected with id ' + connectedSocked.id + '.');
        DashboardProvider.dashboardSockets[connectedSocked.id] = connectedSocked;

        socket.on('disconnect', function () {
            console.log('[DashboardProvider] Dashboard with id ' + connectedSocked.id + ' disconnected.');
            delete DashboardProvider.dashboardSockets[connectedSocked.id];
        });
    });
};

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
