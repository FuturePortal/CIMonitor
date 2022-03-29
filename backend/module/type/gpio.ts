import ModuleType from 'backend/module/type';
import { GpioModule as GpioType } from 'types/module';

class GpioModule extends ModuleType {
    name: 'GPIO';

    fire(config: GpioType): void {
        config;
    }
}

export default new GpioModule();
