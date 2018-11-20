const piblaster = require('pi-blaster.js');

const AbstractModule = require('./AbstractModule');
const Events = require('../Events');
const StatusManager = require('../status/StatusManager');

class LedStrip extends AbstractModule {
    init() {
        Events.watch(Events.event.statusesUpdated, this.setStripState.bind(this));

        this.colors = {
            error: {
                r: 255,
                g: 0,
                b: 0,
                intensity: 100,
            },
            success: {
                r: 0,
                g: 255,
                b: 0,
                intensity: 100,
            },
            warning: {
                r: 255,
                g: 50,
                b: 0,
                intensity: 100,
            },
            neutral: {
                r: 0,
                g: 255,
                b: 0,
                intensity: 30,
            },
            off: {
                r: 0,
                g: 0,
                b: 0,
                intensity: 100,
            },
        };

        this.statusColor = 'success';
        this.currentColor = 'off';

        this.currentIntensity = 100;

        this.redPin = this.config.gpioPinRed;
        this.greenPin = this.config.gpioPinGreen;
        this.bluePin = this.config.gpioPinBlue;

        if (typeof this.config.colors !== 'undefined') {
            for (let overWriteColor in this.config.colors) {
                if (this.config.colors.hasOwnProperty(overWriteColor)) {
                    this.colors[overWriteColor] = this.config.colors[overWriteColor];
                }
            }
        }

        this.lastChange = new Date();

        this.colorCycle();
    }

    colorCycle() {
        if (this.currentColor !== this.statusColor) {
            console.log(`[LedStrip] Changing color to status ${this.statusColor}`);
            return this.changeToColor(this.statusColor, false);
        }

        if (this.statusColor === 'warning' || this.statusColor === 'error') {
            return this.changeToColor(this.statusColor, this.currentIntensity === 100);
        }

        const now = new Date();
        // Change the led strip color to a neutral color after 3 minutes
        if (this.currentColor !== 'neutral' && now.getTime() - this.lastChange.getTime() > 1000 * 60 * 5) {
            console.log('[LedStrip] Changing the color to the neutral color.');
            this.statusColor = 'neutral';
            return this.changeToColor('neutral', false);
        }

        setTimeout(() => {
            this.colorCycle();
        }, 1000);
    }

    /**
     * Calculates the fade between two numbers given a number of steps
     *
     * @param {int} startNumber
     * @param {int} finalNumber
     * @param {int} currentStep
     * @param {int} steps
     * @returns {int}
     */
    calculateFade(startNumber, finalNumber, currentStep, steps) {
        if (startNumber === finalNumber) {
            return finalNumber;
        }

        const range = finalNumber < startNumber ? startNumber - finalNumber : finalNumber - startNumber;
        const stepSize = range / steps;

        if (finalNumber < startNumber) {
            return startNumber - stepSize * currentStep;
        }

        return startNumber + stepSize * currentStep;
    }

    /**
     * Change the led strip color to a named color
     *
     * @param {string} color
     * @param {boolean} dimmed
     * @param {int|null} step
     */
    changeToColor(color, dimmed, step = 0) {
        const steps = 50;
        let red = this.colors[color].r;
        let green = this.colors[color].g;
        let blue = this.colors[color].b;

        const intensity = dimmed ? this.colors[color].intensity / 10 : this.colors[color].intensity;

        red = this.calculateFade(this.colors[this.currentColor].r, red, step, steps);
        green = this.calculateFade(this.colors[this.currentColor].g, green, step, steps);
        blue = this.calculateFade(this.colors[this.currentColor].b, blue, step, steps);

        const fadeIntensity = this.calculateFade(this.currentIntensity, intensity, step, steps);

        red = ((red / 255) * fadeIntensity) / 100;
        green = ((green / 255) * fadeIntensity) / 100;
        blue = ((blue / 255) * fadeIntensity) / 100;

        // piblaster.setPwm(this.redPin, red);
        // piblaster.setPwm(this.greenPin, green);
        // piblaster.setPwm(this.bluePin, blue);

        if (step >= steps) {
            this.currentIntensity = intensity;
            this.currentColor = color;
            this.lastChange = new Date();
            this.colorCycle();
            return;
        }

        setTimeout(() => this.changeToColor(color, dimmed, step + 1), 20);
    }

    setStripState() {
        this.statusColor = StatusManager.getGlobalState();
    }
}

module.exports = LedStrip;
