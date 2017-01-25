var io = require('socket.io-client');

/**
 * CIMonitorListener
 *
 * @param {string} webHookUrl
 * @param {StatusManager} statusManager
 * @constructor
 */
var CIMonitorListener = function(webHookUrl, statusManager) {
    console.log('[CIMonitorListener] Hooking into web socket ' + webHookUrl + ' to listen to statuses...');

    this.webHookUrl = webHookUrl;

    /** {StatusManager} */
    this.statusManager = statusManager;

    this.listenToStatuses();
};

CIMonitorListener.prototype.listenToStatuses = function() {
    var CIMonitorListener = this;

    var socket = require('socket.io-client')(this.webHookUrl);
    socket.on('connect', function() { CIMonitorListener.onConnect(); });
    socket.on('status', function(status) { CIMonitorListener.onStatus(status); });
    socket.on('disconnect', function() { CIMonitorListener.onDisconnect(); });
};

CIMonitorListener.prototype.onConnect = function() {
    console.log('[CIMonitorListener] Connected to the external CIMonitor at ' + this.webHookUrl + '.');
};

CIMonitorListener.prototype.onStatus = function(data) {
    console.log('[CIMonitorListener] New external status comming in...');
    this.statusManager.newStatus(data);
};

CIMonitorListener.prototype.onDisconnect = function() {
    console.log('[CIMonitorListener] Disconnected from ' + this.webHookUrl + '.');
};

module.exports = CIMonitorListener;
