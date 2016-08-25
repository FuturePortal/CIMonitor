var util = require('util');
var StatusModule = require('./StatusModule');
var piblaster = require('pi-blaster.js');

/**
 * LedStrip
 *
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var LedStrip = function(config, statusManager) {
    StatusModule.call(this, config, statusManager);
};
util.inherits(LedStrip, StatusModule);

/**
 * Set the gpio pins to the correct mode on initialisation
 */
LedStrip.prototype.init = function() {
    this.redPin = this.config.gpioPinRed;
    this.greenPin = this.config.gpioPinGreen;
    this.bluePin = this.config.gpioPinBlue;

    this.prepareRelay();
};

LedStrip.prototype.setColor = function(red, green, blue) {
    piblaster.setPwm(this.redPin, red);
    piblaster.setPwm(this.greenPin, green);
    piblaster.setPwm(this.bluePin, blue);
};

/**
 * Handle the incoming statuses
 */
LedStrip.prototype.handleStatus = function() {
    if (this.statusManager.hasFailureStatus()) {
        this.setColor(0.31, 0, 0);
        return;
    }

    if (this.statusManager.hasStartedStatus()) {
        this.setColor(0.31, 0.08, 0);
        return;
    }

    this.setColor(0, 0.12, 0);
};

/**
 * Prepares the gpio pins. Turns the green light on, turns the orange and red light off.
 */
LedStrip.prototype.prepareRelay = function() {
    this.handleStatus();
};

module.exports = LedStrip;
