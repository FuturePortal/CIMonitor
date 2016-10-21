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
        },
        off: {
            r: 0,
            g: 0,
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
};

LedStrip.prototype.colorCycle = function() {
    var LedStrip = this;

    if (this.currentColor !== this.statusColor) {
        console.log('[LedStrip] Changing color to status ' + this.statusColor);
        return this.changeToColor(this.statusColor, 100);
    }

    if (this.statusColor === 'started' || this.statusColor === 'failure') {
        return this.changeToColor(this.statusColor, this.currentIntencity === 100 ? 10 : 100);
    }

    setTimeout(function() {
        LedStrip.colorCycle();
    }, 1000);
};

LedStrip.prototype.calculateFade = function(startColor, finalColor, currentStep, steps) {
    if (startColor === finalColor) {
        return finalColor;
    }

    var range = (finalColor < startColor) ? startColor - finalColor : finalColor - startColor;
    var stepSize = range / steps;

    if (finalColor < startColor) {
        return startColor - stepSize * currentStep;
    }
    
    return startColor + stepSize * currentStep;
};

LedStrip.prototype.changeToColor = function(color, intencity, step = 0) {
    var steps = 50;
    var LedStrip = this;
    var red = this.colors[color].r;
    var green = this.colors[color].g;
    var blue = this.colors[color].b;

    red = this.calculateFade(this.colors[this.currentColor].r, red, step, steps);
    green = this.calculateFade(this.colors[this.currentColor].g, green, step, steps);
    blue = this.calculateFade(this.colors[this.currentColor].b, blue, step, steps);

    var fadeIntencity = this.calculateFade(this.currentIntencity, intencity, step, steps);

    red = red / 255 * fadeIntencity / 100;
    green = green / 255 * fadeIntencity / 100;
    blue = blue / 255 * fadeIntencity / 100;

    piblaster.setPwm(this.redPin, red);
    piblaster.setPwm(this.greenPin, green);
    piblaster.setPwm(this.bluePin, blue);

    if (step >= steps) {
        this.currentIntencity = intencity;
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
        this.statusColor = 'failure';
        return;
    }

    if (this.statusManager.hasStartedStatus()) {
        this.statusColor = 'started';
        return;
    }

    this.statusColor = 'success';
};

module.exports = LedStrip;

