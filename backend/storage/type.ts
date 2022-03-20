import ServerSettings from 'types/server';
import Status from 'types/status';

abstract class StorageType {
    abstract name: string;

    abstract validateEnvironment(): boolean;

    abstract loadStatuses(): Status[];

    // eslint-disable-next-line no-unused-vars
    abstract saveStatuses(statuses: Status[]): void;

    abstract loadSettings(): ServerSettings;

    // eslint-disable-next-line no-unused-vars
    abstract saveSettings(settings: ServerSettings): void;
}

export default StorageType;
