const util = require('util');
var StatusModule = require('./StatusModule');
var exec = require('child_process').exec;

const ON = 0;
const OFF = 1;

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
    var greenLight = ON;
    var orangeLight = OFF;
    var redLight = OFF;

    if (this.statusManager.hasStartedStatus()) {
        greenLight = OFF;
        orangeLight = ON;
    }

    if (this.statusManager.hasFailureStatus()) {
        greenLight = OFF;
        redLight = ON;
    }

    exec('gpio write ' + this.greenPin + ' ' + greenLight);
    exec('gpio write ' + this.orangePin + ' ' + orangeLight);
    exec('gpio write ' + this.redPin + ' ' + redLight);
    console.log(
        '[TrafficLight] Green is ' + (greenLight === ON) ? 'on' : 'off' + ', orange is'
        + (orangeLight === ON) ? 'on' : 'off' + ', and red is ' + (redLight === ON) ? 'on' : 'off' + '.'
    );
};

/**
 * Prepares the gpio pins. Turns the green light on, turns the orange and red light off.
 */
TrafficLight.prototype.prepareRelay = function() {
    exec('gpio mode ' + this.redPin + ' out');
    exec('gpio write ' + this.redPin + ' ' + OFF);
    exec('gpio mode ' + this.orangePin + ' out');
    exec('gpio write ' + this.orangePin + ' ' + OFF);
    exec('gpio mode ' + this.greenPin + ' out');
    exec('gpio write ' + this.greenPin + ' ' + ON);
    console.log(
        '[TrafficLight] Set gpio pin ' + this.redPin + ', ' + this.orangePin + ' and ' + this.greenPin
        + ' to output mode and switched off. Green light is on.'
    );
};

module.exports = TrafficLight;
