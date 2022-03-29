import ModuleType from 'backend/module/type';
import { ModuleConfig } from 'types/module';

class GpioModule extends ModuleType {
    name: 'GPIO';

    fire(config: ModuleConfig): void {
        console.log('[module/gpio] FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE');
        console.log(config);
    }
}

export default new GpioModule();
