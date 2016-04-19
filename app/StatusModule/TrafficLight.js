const util = require('util');
var StatusModule = require('./StatusModule');
var exec = require('child_process').exec;

/**
 * TrafficLight
 *
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var TrafficLight = function(config, statusManager) {
    StatusModule.call(this, config, statusManager);
};
util.inherits(TrafficLight, StatusModule);

/**
 * Set the gpio pins to the correct mode on initialisation
 */
TrafficLight.prototype.init = function() {
    this.redPin = this.config.gpioPinRedLight;
    this.orangePin = this.config.gpioPinOrangeLight;
    this.greenPin = this.config.gpioPinGreenLight;

    this.prepareRelay();
};

/**
 * Handle the incoming statuses
 *
 * @param {object} status
 */
TrafficLight.prototype.handleStatus = function(status) {
    switch (status.status) {
        case 'success':
            break;
        case 'started':
            break;
        case 'failure':
            break;
    }
};

/**
 * Prepares the gpio pins, turns on the green light
 */
TrafficLight.prototype.prepareRelay = function() {
    exec('gpio mode ' + this.redPin + ' out');
    exec('gpio write ' + this.redPin + ' 1');
    exec('gpio mode ' + this.orangePin + ' out');
    exec('gpio write ' + this.orangePin + ' 1');
    exec('gpio mode ' + this.greenPin + ' out');
    exec('gpio write ' + this.greenPin + ' 0');
    console.log(
        '[TrafficLight] Set gpio pin ' + this.redPin + ', ' + this.orangePin + ' and ' + this.greenPin
        + ' to output mode and switched off.'
    );
};

module.exports = TrafficLight;
