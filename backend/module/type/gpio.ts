import { exec } from 'child_process';

import ModuleType from 'backend/module/type';
import { ModuleConfig } from 'types/module';

class GpioModule extends ModuleType {
    name: 'GPIO';

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

    gpio(pin: number, on: boolean) {
        console.log(`[module/gpio] gpio set ${pin} ${on ? '1' : '0'}.`);
        exec(`gpio set ${pin} ${on ? '1' : '0'}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`[module/gpio] Could not execute gpio command for pin ${pin}.`);
                console.error(error);
            }

            if (stderr) {
                console.log(`[module/gpio] Could not execute gpio command for pin ${pin}.`);
                console.error(stderr);
            }
        });
    }
}

export default new GpioModule();
