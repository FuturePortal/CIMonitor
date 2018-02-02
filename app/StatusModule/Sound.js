var util = require('util');
var StatusModule = require('./StatusModule');
var piblaster = require('pi-blaster.js');
var exec = require('child_process').exec;

/**
 * Sound
 *
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var Sound = function(config, statusManager) {
    StatusModule.call(this, config, statusManager);
};
util.inherits(Sound, StatusModule);

/**
 * Execute the Sound with the given config for the matched event.
 *
 * @param {object} doConfig
 */
Sound.prototype.execute = function(doConfig) {
    console.log('[Sound] Playing file ' + doConfig.file);
    exec('aplay ' + doConfig.file);
};

module.exports = Sound;
