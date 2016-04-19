const util = require('util');
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
 * Execute the MarbleRun with the given config for the matched event.
 *
 * @param doConfig
 */
MarbleRun.prototype.execute = function(doConfig) {
    var MarbleRun = this;

    var fireAmount = doConfig.fireAmount;

    if (isNaN(fireAmount) || fireAmount < 1) {
        console.log('[MarbleRun] Invalid fire amount configured: "' + req.params.amount + '".');
        return;
    }

    if (fireAmount > this.availableMarbles) {
        console.log(
            '[MarbleRun] Wanted to fire ' + fireAmount + ' marble(s), but only ' +  this.availableMarbles
            + ' marbles are available.'
        );
        fireAmount = this.availableMarbles;
    }

    this.availableMarbles -= fireAmount;
    console.log('[MarbleRun] Firing ' + fireAmount + ' marble(s) (' + this.availableMarbles + ' left available).');

    // Enable the relay to fire a ball.
    exec('gpio write ' + this.pin + ' 0');

    // Close the relay if all balls are fired
    setTimeout(function() {
        exec('gpio write ' + MarbleRun.pin + ' 1');
    }, fireAmount * this.oneMarbleFireTime);

    // Make the marbles available again when they return.
    for (var i = 1; i <= fireAmount; i++) {
        setTimeout(function() {
            MarbleRun.availableMarbles++;
            console.log('[MarbleRun] ' + MarbleRun.availableMarbles + ' marble(s) available.');
        }, 13000 + ((i - 1) * MarbleRun.oneMarbleFireTime));
    }
};

/**
 * Set the gpio pins to the correct mode on initialisation
 */
MarbleRun.prototype.init = function() {
    /** {int} */
    this.pin = this.config.gpioPin;

    /** {int} */
    this.availableMarbles = this.config.maxMarbles;

    /** {int} */
    this.oneMarbleFireTime = this.config.oneMarbleFireTime;

    /** {int} */
    this.runDuration = this.config.runDuration;

    exec('gpio mode ' + this.pin + ' out');
    exec('gpio write ' + this.pin + ' 1');
    console.log('[MarbleRun] Set gpio pin ' + this.pin + ' to output mode and switched off.');
};

module.exports = MarbleRun;
