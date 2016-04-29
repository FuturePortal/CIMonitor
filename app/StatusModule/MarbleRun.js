var util = require('util');
var StatusModule = require('./StatusModule');
var exec = require('child_process').exec;

/**
 * MarbleRun
 *
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var MarbleRun = function(config, statusManager) {
    StatusModule.call(this, config, statusManager);
};
util.inherits(MarbleRun, StatusModule);

/**
 * Set the gpio pins to the correct mode on initialisation
 */
MarbleRun.prototype.init = function() {
    /** @type {int} */
    this.pin = this.config.gpioPin;

    /** @type {int} */
    this.availableMarbles = this.config.maxMarbles;

    /** @type {int} */
    this.oneMarbleFireTime = this.config.oneMarbleFireTime;

    /** @type {int} */
    this.runDuration = this.config.runDuration;

    /** @type {boolean} */
    this.isFiring = false;

    this.prepareRelay();
};

/**
 * Prepare te relay for on/off toggling
 */
MarbleRun.prototype.prepareRelay = function() {
    exec('gpio mode ' + this.pin + ' out');
    exec('gpio write ' + this.pin + ' 1');
    console.log('[MarbleRun] Set gpio pin ' + this.pin + ' to output mode and switched off.');
};

/**
 * Execute the MarbleRun with the given config for the matched event.
 *
 * @param {object} doConfig
 */
MarbleRun.prototype.execute = function(doConfig) {
    var MarbleRun = this;

    var fireAmount = doConfig.fireAmount;

    if (isNaN(fireAmount) || fireAmount < 1) {
        console.log('[MarbleRun] Invalid fire amount configured: "' + fireAmount + '".');
        return;
    }

    if (MarbleRun.isFiring) {
        setTimeout(function() {
            console.log('[MarbleRun] Postponing fire as it already is firing.');
            MarbleRun.execute(doConfig);
        }, 1000);
        return;
    }

    if (fireAmount > MarbleRun.availableMarbles) {
        console.log(
            '[MarbleRun] Wanted to fire ' + fireAmount + ' marble(s), but only ' +  this.availableMarbles
            + ' marbles are available.'
        );
        fireAmount = MarbleRun.availableMarbles;
    }

    if (fireAmount === 0) {
        return;
    }

    MarbleRun.isFiring = true;
    MarbleRun.availableMarbles -= fireAmount;
    console.log('[MarbleRun] Firing ' + fireAmount + ' marble(s) (' + MarbleRun.availableMarbles + ' left available).');

    // Enable the relay to fire a marble.
    exec('gpio write ' + MarbleRun.pin + ' 0');

    // Close the relay if all marbles are fired
    setTimeout(function() {
        exec('gpio write ' + MarbleRun.pin + ' 1');
        MarbleRun.isFiring = false;
    }, fireAmount * MarbleRun.oneMarbleFireTime);

    // Make the marbles available again when they return.
    for (var i = 1; i <= fireAmount; i++) {
        setTimeout(function() {
            MarbleRun.availableMarbles++;
            console.log('[MarbleRun] ' + MarbleRun.availableMarbles + ' marble(s) available.');
        }, 13000 + (i - 1) * MarbleRun.oneMarbleFireTime);
    }
};

module.exports = MarbleRun;
