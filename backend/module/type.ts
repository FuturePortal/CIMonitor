import { ModuleConfig } from 'types/module';

abstract class ModuleType {
    abstract name: string;

    // eslint-disable-next-line no-unused-vars
    abstract fire(config: ModuleConfig): void;
}

export default ModuleType;
