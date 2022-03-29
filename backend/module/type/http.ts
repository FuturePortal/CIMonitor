import ModuleType from 'backend/module/type';
import { ModuleConfig } from 'types/module';

class HttpModule extends ModuleType {
    name: 'HTTP';

    fire(config: ModuleConfig): void {
        if (config.type !== 'http') {
            return;
        }

        console.log(`[module/gpio] Triggering HTTP ${config.url}...`);

        // TODO: not important for now
    }
}

export default new HttpModule();
