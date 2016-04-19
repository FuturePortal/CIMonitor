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
    var enabledPins = [];

    for (var event in this.events) {
        var pin = this.events[event].do.gpioPin;

        // Don't enable again if already enabled
        if (enabledPins.indexOf(pin) >= 0) {
            continue;
        }

        exec('gpio mode ' + pin + ' out');
        exec('gpio write ' + pin + ' 1');
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
    exec('gpio write ' + doConfig.gpioPin + ' 1');
    console.log(
        '[PowerUp] Power on gpio pin ' + doConfig.gpioPin + ' for ' + doConfig.powerForMiliSeconds + 'ms.'
    );

    setTimeout(function() {
        exec('gpio write ' + doConfig.gpioPin + ' 0');
        console.log('[PowerUp] Power off gpio pin ' + doConfig.gpioPin + '.');
    }, doConfig.powerForMiliSeconds);
};

module.exports = PowerUp;
