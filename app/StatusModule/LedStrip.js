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

    this.colors = {
        failure: {
            r: 255,
            g: 0,
            b: 0
        },
        success: {
            r: 0,
            g: 255,
            b: 0
        },
        started: {
            r: 255,
            g: 50,
            b: 0 
        }
    };

    this.statusColor = 'success';
    this.currentColor = 'off';

    this.currentIntencity = 100;
};
util.inherits(LedStrip, StatusModule);

/**
 * Set the gpio pins to the correct mode on initialisation
 */
LedStrip.prototype.init = function() {
    this.redPin = this.config.gpioPinRed;
    this.greenPin = this.config.gpioPinGreen;
    this.bluePin = this.config.gpioPinBlue;

    this.colorCycle();
    this.runTestCycle(0);
};

LedStrip.prototype.colorCycle = function() {
    var LedStrip = this;
    console.log('cycle');

    if (this.currentColor !== this.statusColor) {
        return this.changeToColor(this.statusColor, 10);
    }

    setTimeout(function() {
        LedStrip.colorCycle();
    }, 1000);
};

LedStrip.prototype.changeToColor = function(color, intencity, step = 0) {
    var LedStrip = this;
    var red = this.colors[color].r;
    var green = this.colors[color].g;
    var blue = this.colors[color].b;

    if (step === 0) {
        console.log('Changing color to ' + color + ' (R:' + red + ' G:' + green +  ' B:' + blue + ')...');
    }

    red = red / 255 * intencity / 100;
    green = green / 255 * intencity / 100;
    blue = blue / 255 * intencity / 100;

    piblaster.setPwm(this.redPin, red);
    piblaster.setPwm(this.greenPin, green);
    piblaster.setPwm(this.bluePin, blue);

    if (step > 99) {
        console.log('COLOR CHANGED!');
        this.currentColor = color;
        this.colorCycle();
        return;
    }

    setTimeout(function() {
        LedStrip.changeToColor(color, intencity, step + 1);
    }, 20);
};

/**
 * Handle the incoming statuses
 */
LedStrip.prototype.handleStatus = function() {
    if (this.statusManager.hasFailureStatus()) {
        //this.setColor(0.31, 0, 0);
        return;
    }

    if (this.statusManager.hasStartedStatus()) {
        //this.setColor(0.31, 0.08, 0);
        return;
    }

    //this.setColor(0, 0.12, 0);
};

LedStrip.prototype.runTestCycle = function(counter) {
    var LedStrip = this;

    switch(counter % 4) {
        case 0:
        case 2:
            this.statusColor = 'started';
            break;
        case 1:
            this.statusColor = 'success';
            break;
        case 3:
            this.statusColor = 'failure';
            break;
    }

    setTimeout(function() {
        LedStrip.runTestCycle(counter + 1);
    }, 5000);
};

module.exports = LedStrip;

