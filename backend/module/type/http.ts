import ModuleType from 'backend/module/type';
import { HttpModule as HttpType } from 'types/module';

class HttpModule extends ModuleType {
    name: 'HTTP';

    fire(config: HttpType): void {
        config;
    }
}

export default new HttpModule();
