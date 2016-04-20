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

    this.connectToDashboard();
};

/**
 * Connects to the dashboard, and listens for incoming statuses
 */
DashboardProvider.prototype.connectToDashboard = function() {
    var DashboardProvider = this;

    var socket  = this.dashboardSocket.listen(this.httpServer);
    socket.on('connection', function(socket){
        console.log('[DashboardProvider] Dashboard connected.');

        // Listen to new statuses
        DashboardProvider.eventHandler.on('status', function(status) {
            DashboardProvider.displayStatus(DashboardProvider.dashboardSocket, status);
        });
    });
};

/**
 * Display the new status on the dashboard
 *
 * @param {http} socket
 * @param {object} status
 */
DashboardProvider.prototype.displayStatus = function(socket, status) {
    socket.emit('status', {
        hasStartedStatus: this.statusManager.hasStartedStatus(),
        hasFailureStatus: this.statusManager.hasFailureStatus(),
        statuses: this.statusManager.getStatuses()
    });
    console.log('[DashboardProvider] Sent update to the dashboard.')
};

module.exports = DashboardProvider;
