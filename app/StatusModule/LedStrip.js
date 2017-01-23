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
            b: 0,
            intensity: 100
        },
        success: {
            r: 0,
            g: 255,
            b: 0,
            intensity: 100
        },
        started: {
            r: 255,
            g: 50,
            b: 0 ,
            intensity: 100
        },
        neutral: {
            r: 0,
            g: 255,
            b: 0,
            intensity: 50
        },
        off: {
            r: 0,
            g: 0,
            b: 0,
            intensity: 100
        }
    };

    this.statusColor = 'success';
    this.currentColor = 'off';

    this.currentIntencity = 100;
};
util.inherits(LedStrip, StatusModule);

/**
 * Overwrite default values from the config
 */
LedStrip.prototype.init = function() {
    this.redPin = this.config.gpioPinRed;
    this.greenPin = this.config.gpioPinGreen;
    this.bluePin = this.config.gpioPinBlue;

    if (typeof this.config.colors !== 'undefined') {
        for (var overWriteColor in this.config.colors) {
            if (this.config.colors.hasOwnProperty(overWriteColor)) {
                this.colors[overWriteColor] = this.config.colors[overWriteColor];
            }
        }
    }

    this.lastChange = new Date();
    
    this.colorCycle();
};

/**
 * This method handles the current led strip color, determined by the current status
 */
LedStrip.prototype.colorCycle = function() {
    var LedStrip = this;

    if (this.currentColor !== this.statusColor) {
        console.log('[LedStrip] Changing color to status ' + this.statusColor);
        return this.changeToColor(this.statusColor, false);
    }

    if (this.statusColor === 'started' || this.statusColor === 'failure') {
        return this.changeToColor(this.statusColor, this.currentIntencity === 100);
    }

    var now = new Date();
    // Change the led strip color to a neutral color after 3 minutes
    if (this.currentColor !== 'neutral' && now.getTime() - this.lastChange.getTime() > 1000 * 60 * 5) {
        console.log('[LedStrip] Changing the color to the neutral color.');
        this.statusColor = 'neutral';
        return this.changeToColor('neutral', false);
    }

    setTimeout(function() {
        LedStrip.colorCycle();
    }, 1000);
};

/**
 * Calculates the fade between two numbers given a number of steps
 *
 * @param {int} startNumber
 * @param {int} finalNumber
 * @param {int} currentStep
 * @param {int} steps
 * @returns {int}
 */
LedStrip.prototype.calculateFade = function(startNumber, finalNumber, currentStep, steps) {
    if (startNumber === finalNumber) {
        return finalNumber;
    }

    var range = (finalNumber < startNumber) ? startNumber - finalNumber : finalNumber - startNumber;
    var stepSize = range / steps;

    if (finalNumber < startNumber) {
        return startNumber - stepSize * currentStep;
    }
    
    return startNumber + stepSize * currentStep;
};

/**
 * Change the led strip color to a named color
 *
 * @param {string} color
 * @param {boolean} dimmed
 * @param {int|null} step
 */
LedStrip.prototype.changeToColor = function(color, dimmed, step) {
    step = step || 0;

    var steps = 50;
    var LedStrip = this;
    var red = this.colors[color].r;
    var green = this.colors[color].g;
    var blue = this.colors[color].b;

    var intensity = dimmed ? this.colors[color].intensity / 10 : this.colors[color].intensity;

    red = this.calculateFade(this.colors[this.currentColor].r, red, step, steps);
    green = this.calculateFade(this.colors[this.currentColor].g, green, step, steps);
    blue = this.calculateFade(this.colors[this.currentColor].b, blue, step, steps);

    var fadeIntensity = this.calculateFade(this.currentIntencity, intensity, step, steps);

    red = red / 255 * fadeIntensity / 100;
    green = green / 255 * fadeIntensity / 100;
    blue = blue / 255 * fadeIntensity / 100;

    piblaster.setPwm(this.redPin, red);
    piblaster.setPwm(this.greenPin, green);
    piblaster.setPwm(this.bluePin, blue);

    if (step >= steps) {
        this.currentIntencity = intensity;
        this.currentColor = color;
        this.lastChange = new Date();
        this.colorCycle();
        return;
    }

    setTimeout(function() {
        LedStrip.changeToColor(color, dimmed, step + 1);
    }, 20);
};

/**
 * Set the led strip status to what should be presented to the user
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
