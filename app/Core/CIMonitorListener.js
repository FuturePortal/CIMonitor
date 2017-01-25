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

    console.log('[CIMonitorListener] Waiting for statuses.');
};

CIMonitorListener.prototype.listenToStatuses = function() {
    var CIMonitorListener = this;

    var socket = io.connect(this.webHookUrl);
    socket.on('status', function(data) {
        console.log('[CIMonitorListener] RECEIVED STATUS!!!');
        CIMonitorListener.statusManager.newStatus(data);
    });
};

module.exports = CIMonitorListener;
