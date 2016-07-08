const util = require('util');
var StatusModule = require('./StatusModule');
var exec = require('child_process').exec;

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
    exec('pigs p' + this.redPin + ' ' + red);
    exec('pigs p' + this.greenPin + ' ' + green);
    exec('pigs p' + this.bluePin + ' ' + blue);
};

/**
 * Handle the incoming statuses
 *
 * @param {object} status
 */
LedStrip.prototype.handleStatus = function(status) {
    if (this.statusManager.hasFailureStatus()) {
        this.setColor(255, 0, 0);
        return;
    }

    if (this.statusManager.hasStartedStatus()) {
        this.setColor(255, 187, 0);
        return;
    }

    this.setColor(0, 255, 0);
};

/**
 * Prepares the gpio pins. Turns the green light on, turns the orange and red light off.
 */
LedStrip.prototype.prepareRelay = function() {
    this.setColor(0, 255, 255);
    console.log(
        '[LedStrip] Led strip enabled on red:' + this.redPin + ', green:' + this.greenPin + ' and blue:' + this.bluePin
        + '. Strip is off.'
    );
};

module.exports = LedStrip;
