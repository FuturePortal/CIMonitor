/**
 * "Abstract" StatusModule, should be extended.
 *
 * @abstract
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var StatusModule = function(config, statusManager) {
    this.config = config.globalConfig;

    this.events = config.events;

    this.statusManager = statusManager;

    this.init();
};

/**
 * init stump, should be overwritten.
 */
StatusModule.prototype.init = function() {

};

/**
 * Handle an incoming status.
 * Will loop trough the events list by default, but can be overwritten.
 *
 * @param status
 */
StatusModule.prototype.handleStatus = function(status) {
    for (var event in this.events) {
        if (this.doesEventMeetCriteria(this.events[event].on, status)) {
            this.execute(this.events[event].do);
        }
    }
};

/**
 * Check if the event meets the criteria to trigger the followup event.
 *
 * @param {object} criteria
 * @param {object} status
 * @returns {boolean}
 */
StatusModule.prototype.doesEventMeetCriteria = function(criteria, status) {
    for (var criterion in criteria) {
        if (criteria[criterion] != status[criterion]) {
            return false;
        }
    }

    return true;
};

/**
 * Execute the event that met the acceptance criteria.
 *
 * @param {object} doConfig
 */
StatusModule.prototype.execute = function(doConfig) {
    console.log('Nothing to do for: ' + JSON.stringify(doConfig));
};

module.exports = StatusModule;
