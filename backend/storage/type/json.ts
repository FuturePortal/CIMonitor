import StorageType from 'backend/storage/type';
import ServerSettings from 'types/server';
import Status from 'types/status';

class JsonStorage extends StorageType {
    name = 'json';

    validateEnvironment() {
        // JSON should be able to be created on any environment, making a good fallback/default
        return true;
    }

    loadSettings(): ServerSettings {
        return {};
    }

    loadStatuses(): Status[] {
        return [];
    }

    saveSettings(settings: ServerSettings): void {
        settings;
    }

    saveStatuses(statuses: Status[]): void {
        statuses;
    }
}

export default new JsonStorage();
