import ModuleType from 'backend/module/type';
import { ModuleConfig } from 'types/module';

class HttpModule extends ModuleType {
    name: 'HTTP';

    fire(config: ModuleConfig): void {
        console.log('[module/http] FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE FIRE');
        console.log(config);
    }
}

export default new HttpModule();
