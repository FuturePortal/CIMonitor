/**
 * "Abstract" StatusModule, should be extended.
 *
 * @abstract
 * @param {object} config
 * @constructor
 */
var StatusModule = function(config) {
    this.config = config;

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
    var events = this.config.events;

    for (var event in events) {
        if (this.doesEventMeetCriteria(events[event].on, status)) {
            this.execute(events[event].do);
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
