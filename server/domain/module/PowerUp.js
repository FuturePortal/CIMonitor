const piblaster = require('pi-blaster.js');

const AbstractModule = require('./AbstractModule');

class PowerUp extends AbstractModule {
    fireEvent(config) {
        // Switch the relay on for the configured gpio pin
        piblaster.setPwm(config.gpioPin, 0);
        console.log(`[PowerUp] Power on gpio pin ${config.gpioPin} for ${config.powerForMilliseconds}ms.`);

        setTimeout(() => {
            piblaster.setPwm(config.gpioPin, 1);
            console.log(`[PowerUp] Power off gpio pin ${config.gpioPin}.`);
        }, config.powerForMilliseconds);
    }
}

module.exports = PowerUp;
