const util = require('util');
var StatusModule = require('./StatusModule');

/**
 * MarbleRun
 *
 * @param config
 * @constructor
 */
var MarbleRun = function(config) {
    console.log('Load module MarbleRun.');
    StatusModule.call(this, config);
};
util.inherits(MarbleRun, StatusModule);

/**
 * Execute the MarbleRun with the given config for the matched event.
 *
 * @param doConfig
 */
MarbleRun.prototype.execute = function(doConfig) {
    // @todo: fire marbles!
};

/**
 * Set the gpio pins to the correct mode on initialisation
 */
MarbleRun.prototype.init = function() {
    // @todo: Set gpio pins to the correct mode
};

module.exports = MarbleRun;
