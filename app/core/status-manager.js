/**
 * @param {EventEmitter} eventHandler
 * @constructor
 */
var StatusManager = function(eventHandler) {
    /**
     * {EventEmitter}
     */
    this.eventHandler = eventHandler;

    this.statuses = [];

    console.log('Status manager init.');
};

/**
 * Processes an incoming status
 *
 * @param {object} status
 */
StatusManager.prototype.newStatus = function(status) {
    this.statuses.push(status);
    this.eventHandler.emit('status', status);
};

module.exports = StatusManager;
