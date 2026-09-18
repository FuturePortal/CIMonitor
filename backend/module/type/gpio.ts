import { ChildProcess, spawn } from 'child_process';

import ModuleType from 'backend/module/type';
import { ModuleConfig } from 'types/module';

/**
 * Drives GPIO pins through libgpiod's `gpioset`, which is installed in the module-client container.
 * Pins are addressed by their BCM line offset (GPIO17 is pin 17). Nothing has to be installed on the
 * host, only the GPIO character device (/dev/gpiochipN) has to be passed to the container.
 *
 * libgpiod only guarantees the output value of a line while the process that requested it is alive,
 * so one `gpioset` process is kept running per pin and replaced whenever the value changes.
 */
class GpioModule extends ModuleType {
	name: 'GPIO';

	holders: Map<number, ChildProcess> = new Map();

	queue: Map<number, Promise<void>> = new Map();

	fire(config: ModuleConfig): void {
		if (config.type !== 'gpio') {
			return;
		}

		console.log(`[module/gpio] Triggering GPIO ${config.mode}...`);

		switch (config.mode) {
			case 'on':
			case 'off':
				return this.gpio(config.pin, config.mode === 'on');
			case 'on-for':
			case 'off-for':
				this.gpio(config.pin, config.mode === 'on-for');

				setTimeout(() => {
					this.gpio(config.pin, config.mode !== 'on-for');
				}, config.duration || 5000);
		}
	}

	gpio(pin: number, on: boolean): void {
		console.log(`[module/gpio] gpio set ${pin} ${on ? 'on' : 'off'}.`);

		// Changes to the same pin are applied one after another, so the previous gpioset process has
		// released the line before the next one requests it.
		const previous = this.queue.get(pin) || Promise.resolve();
		const next = previous.then(() => this.release(pin)).then(() => this.hold(pin, on));

		this.queue.set(pin, next);
	}

	release(pin: number): Promise<void> {
		const holder = this.holders.get(pin);
		this.holders.delete(pin);

		if (!holder || holder.exitCode !== null || holder.signalCode !== null) {
			return Promise.resolve();
		}

		return new Promise((resolve) => {
			holder.once('close', () => resolve());

			if (!holder.kill()) {
				resolve();
			}
		});
	}

	hold(pin: number, on: boolean): void {
		const chip = process.env.GPIO_CHIP || 'gpiochip0';
		// "on" drives the pin low. Relay boards are commonly active-low and this matches the behaviour
		// of the previous WiringPi based implementation.
		const value = on ? 0 : 1;

		const holder = spawn('gpioset', ['--consumer', 'CIMonitor', '--chip', chip, `${pin}=${value}`], {
			stdio: ['ignore', 'ignore', 'pipe'],
		});

		holder.stderr.on('data', (data) => {
			console.log('[module/gpio] Could not execute gpioset command.');
			console.error(String(data).trim());
		});

		holder.on('error', (error) => {
			console.log('[module/gpio] Could not execute gpioset command.');
			console.error(error);

			if (this.holders.get(pin) === holder) {
				this.holders.delete(pin);
			}
		});

		holder.on('exit', () => {
			if (this.holders.get(pin) === holder) {
				this.holders.delete(pin);
			}
		});

		this.holders.set(pin, holder);
	}
}

export default new GpioModule();
