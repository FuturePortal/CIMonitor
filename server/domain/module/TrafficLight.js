const AbstractModule = require('./AbstractModule');
const Events = require('../Events');
const StatusManager = require('../status/StatusManager');
const piblaster = require('pi-blaster.js');

const ON = 0;
const OFF = 1;

class TrafficLight extends AbstractModule {
    init() {
        Events.watch(Events.event.statusesUpdated, this.setLightColor.bind(this));

        this.redPin = this.config.gpioPinRedLight;
        this.orangePin = this.config.gpioPinOrangeLight;
        this.greenPin = this.config.gpioPinGreenLight;
    }

    setLightColor() {
        const globalState = StatusManager.getGlobalState();
        let greenLight = ON;
        let orangeLight = OFF;
        let redLight = OFF;

        if (globalState === 'warning') {
            greenLight = OFF;
            orangeLight = ON;
        }

        if (globalState === 'error') {
            greenLight = OFF;
            redLight = ON;
        }

        piblaster.setPwm(this.greenPin, greenLight);
        piblaster.setPwm(this.orangePin, orangeLight);
        piblaster.setPwm(this.redPin, redLight);

        const greenIs = greenLight === ON ? 'on' : 'off';
        const orangeIs = orangeLight === ON ? 'on' : 'off';
        const redIs = redLight === ON ? 'on' : 'off';

        console.log(`[TrafficLight] Green is ${greenIs}, orange is ${orangeIs}, and red is ${redIs}.`);
    }
}

module.exports = TrafficLight;
