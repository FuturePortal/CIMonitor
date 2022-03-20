import StatusManager from 'backend/status/manager';
import ServerSettings from 'types/server';
import Status from 'types/status';

import FirebaseStorage from './type/firebase';
import JsonStorage from './type/json';
import StorageType from './type';

const storages = {
    json: JsonStorage,
    firebase: FirebaseStorage,
};

class StorageManager {
    storage: StorageType | null = null;

    init(): void {
        console.log('[storage/manager] Init.');

        this.determineStorageType();

        this.load();
    }

    determineStorageType() {
        const desiredStorageType = process.env.STORAGE_TYPE || 'json';

        if (!(desiredStorageType in storages)) {
            console.log(
                `[storage/manager] STORAGE_TYPE ${desiredStorageType} is not valid. Please select 1 of: ${Object.keys(
                    storages
                ).join(', ')}.`
            );
            process.exit(1);
        }

        this.storage = storages[desiredStorageType];

        if (!this.storage.validateEnvironment()) {
            console.log(`[storage/manager] Could not set up status persistence for type ${desiredStorageType}.`);
            process.exit(1);
        }

        console.log(`[storage/manager] Using storage type ${desiredStorageType}.`);
    }

    load(): void {
        StatusManager.setStatuses(this.storage.loadStatuses());

        this.storage.loadSettings();
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