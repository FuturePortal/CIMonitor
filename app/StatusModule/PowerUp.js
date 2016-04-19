const util = require('util');
var StatusModule = require('./StatusModule');
var exec = require('child_process').exec;

/**
 * PowerUp
 *
 * @param {object} config
 * @constructor
 */
var PowerUp = function(config) {
    StatusModule.call(this, config);
};
util.inherits(PowerUp, StatusModule);

/**
 * Set the gpio pins to the correct mode on initialisation
 */
PowerUp.prototype.init = function() {
    // @todo: figure what gpio pins that need to be prepared
};

/**
 * Execute the PowerUp with the given config for the matched event.
 *
 * @param {object} doConfig
 */
PowerUp.prototype.execute = function(doConfig) {
    // @todo: enable the gpio pin for the configured amount of seconds.
};

module.exports = PowerUp;
