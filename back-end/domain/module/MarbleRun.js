const piblaster = require('pi-blaster.js');

const AbstractModule = require('./AbstractModule');

class MarbleRun extends AbstractModule {
    init() {
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
    }

    fireEvent(doConfig) {
        var fireAmount = doConfig.fireAmount;

        if (isNaN(fireAmount) || fireAmount < 1) {
            console.log(`[MarbleRun] Invalid fire amount configured: "${fireAmount}".`);
            return;
        }

        if (this.isFiring) {
            setTimeout(() => {
                console.log('[MarbleRun] Postponing fire as it already is firing.');
                this.fireEvent(doConfig);
            }, 1000);
            return;
        }

        if (fireAmount > this.availableMarbles) {
            console.log(`[MarbleRun] Fire ${fireAmount} marbles, but only ${this.availableMarbles} available.`);
            fireAmount = this.availableMarbles;
        }

        if (fireAmount === 0) {
            return;
        }

        this.isFiring = true;
        this.availableMarbles -= fireAmount;
        console.log(`[MarbleRun] Firing ${fireAmount} marble(s) (${this.availableMarbles} left available).`);

        // Enable the relay to fire a marble.
        piblaster.setPwm(this.pin, 0);

        // Close the relay if all marbles are fired
        setTimeout(() => {
            piblaster.setPwm(this.pin, 1);
            this.isFiring = false;
        }, fireAmount * this.oneMarbleFireTime);

        // Make the marbles available again when they return.
        for (var i = 1; i <= fireAmount; i++) {
            setTimeout(() => {
                this.availableMarbles++;
                console.log('[MarbleRun] ' + this.availableMarbles + ' marble(s) available.');
            }, this.runDuration + (i - 1) * this.oneMarbleFireTime);
        }
    }
}

module.exports = MarbleRun;
