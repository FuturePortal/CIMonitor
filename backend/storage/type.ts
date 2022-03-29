import { ServerSettings } from 'types/cimonitor';
import { ModuleSettings } from 'types/module';
import Status from 'types/status';

abstract class StorageType {
    abstract name: string;

    abstract validateEnvironment(): boolean;

    abstract loadStatuses(): Promise<Status[]>;

    abstract loadSettings(): Promise<ServerSettings>;

    abstract loadModules(): Promise<ModuleSettings>;

    // eslint-disable-next-line no-unused-vars
    abstract saveStatuses(statuses: Status[]): void;

    // eslint-disable-next-line no-unused-vars
    abstract saveSettings(settings: ServerSettings): void;
}

export default StorageType;
