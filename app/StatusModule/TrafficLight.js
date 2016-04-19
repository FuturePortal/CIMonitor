const util = require('util');
var StatusModule = require('./StatusModule');

/**
 * TrafficLight
 *
 * @param config
 * @constructor
 */
var TrafficLight = function(config) {
    StatusModule.call(this, config);
};
util.inherits(TrafficLight, StatusModule);

/**
 * Handle the incoming statuses
 *
 * @param {object} status
 */
TrafficLight.prototype.handleStatus = function(status) {
    // @todo: Handle incoming statuses
};

/**
 * Set the gpio pins to the correct mode on initialisation
 */
TrafficLight.prototype.init = function() {
    // @todo: Set gpio pins to the correct mode
};

module.exports = TrafficLight;
