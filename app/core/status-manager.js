/**
 * @param {EventEmitter} eventHandler
 * @constructor
 */
var StatusManager = function(eventHandler) {
    /**
     * {EventEmitter}
     */
    this.eventHandler = eventHandler;

    /**
     * @type {{}}
     */
    this.statuses = {};
};

/**
 * Processes an incoming status
 *
 * @param {object} status
 */
StatusManager.prototype.newStatus = function(status) {
    // Add extra attributes to the status object
    status.key = this.getKey(status);
    status.updateTime = new Date().getTime();

    // Add the new/updated status to the statuses
    this.statuses[status.key] = status;

    // Fire status event
    this.eventHandler.emit('status', status);
};

/**
 * Get the unique key for a status
 *
 * @param {object} status
 * @returns {string}
 */
StatusManager.prototype.getKey = function(status) {
    return status.project + '.' + status.type + '.' + status.branch;
};

/**
 * Checks if there is a started status between all statuses
 * Because you don't want all lights green when there is still some service running
 *
 * @returns {string}
 */
StatusManager.prototype.hasStartedStatus = function() {
    for (var statusKey in this.statuses) {
        if (this.statuses[statusKey].status === 'started') {
            return true;
        }
    }
    return false;
};

/**
 * Return all statuses sorted by update time
 *
 * @returns {Array}
 */
StatusManager.prototype.getStatuses = function() {
    var statuses = [];

    for (var statusKey in this.statuses) {
        statuses.push(this.statuses[statusKey]);
    }

    statuses.sort(this.sortByUpdateTime);

    return statuses;
};

/**
 * Sorting helper function to sort the status array by the update time
 *
 * @param statusA
 * @param statusB
 * @returns {number}
 */
StatusManager.prototype.sortByUpdateTime = function(statusA, statusB) {
    return statusB.updateTime - statusA.updateTime;
};

module.exports = StatusManager;
