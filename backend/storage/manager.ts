import { ServerSettings } from 'types/cimonitor';
import { ModuleSettings } from 'types/module';
import Status from 'types/status';

import FirebaseStorage from './type/firebase';
import JsonStorage from './type/json';
import StorageType from './type';

class StorageManager {
    storage: StorageType | null = null;

    storages = {
        json: JsonStorage,
        firebase: FirebaseStorage,
    };

    init() {
        console.log('[storage/manager] Init.');

        this.determineStorageType();
    }

    determineStorageType() {
        const desiredStorageType = process.env.STORAGE_TYPE || 'json';

        if (!(desiredStorageType in this.storages)) {
            console.log(
                `[storage/manager] STORAGE_TYPE ${desiredStorageType} is not valid. Please select 1 of: ${Object.keys(
                    this.storages
                ).join(', ')}.`
            );
            process.exit(1);
        }

        this.storage = this.storages[desiredStorageType];

        if (!this.storage.validateEnvironment()) {
            console.log(`[storage/manager] Could not set up status persistence for type ${desiredStorageType}.`);
            process.exit(1);
        }

        console.log(`[storage/manager] Using storage type ${this.storage.name}.`);
    }

    async loadStatuses(): Promise<Status[]> {
        return this.storage.loadStatuses();
    }

    async loadSettings(): Promise<ServerSettings> {
        return this.storage.loadSettings();
    }

    async loadModules(): Promise<ModuleSettings> {
        return this.storage.loadModules();
    }

    saveSettings(settings: ServerSettings) {
        if (!this.storage) {
            console.log('[storage/manager] No storage was defined, no settings saved.');
        }

        this.storage.saveSettings(settings);
    }

    saveStatuses(statuses: Status[]) {
        if (!this.storage) {
            console.log('[storage/manager] No storage was defined, no statuses saved.');
        }

        this.storage.saveStatuses(statuses);
    }
}

export default new StorageManager();
