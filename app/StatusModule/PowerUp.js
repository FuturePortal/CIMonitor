var util = require('util');
var StatusModule = require('./StatusModule');
var piblaster = require('pi-blaster.js');

/**
 * PowerUp
 *
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var PowerUp = function(config, statusManager) {
    StatusModule.call(this, config, statusManager);
};
util.inherits(PowerUp, StatusModule);

/**
 * Set the gpio pins to the correct mode on initialisation
 */
PowerUp.prototype.init = function() {
    var enabledPins = [];

    for (var event in this.events) {
        var pin = this.events[event].do.gpioPin;

        // Don't enable again if already enabled
        if (enabledPins.indexOf(pin) >= 0) {
            continue;
        }

        console.log('[PowerUp] Set gpio pin ' + pin + ' to output mode and switched off.');
        enabledPins.push(pin);
    }
};

/**
 * Execute the PowerUp with the given config for the matched event.
 *
 * @param {object} doConfig
 */
PowerUp.prototype.execute = function(doConfig) {
    // Switch the relay on for the configured gpio pin
    piblaster.setPwm(doConfig.gpioPin, 0);
    console.log(
        '[PowerUp] Power on gpio pin ' + doConfig.gpioPin + ' for ' + doConfig.powerForMiliSeconds + 'ms.'
    );

    setTimeout(function() {
        piblaster.setPwm(doConfig.gpioPin, 1);
        console.log('[PowerUp] Power off gpio pin ' + doConfig.gpioPin + '.');
    }, doConfig.powerForMiliSeconds);
};

module.exports = PowerUp;
