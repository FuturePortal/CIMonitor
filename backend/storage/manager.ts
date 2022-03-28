import StatusManager from 'backend/status/manager';
import ServerSettings from 'types/server';
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

    async init(): Promise<void> {
        console.log('[storage/manager] Init.');

        this.determineStorageType();

        await this.load();
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

    async load(): Promise<void> {
        try {
            const statuses = await this.storage.loadStatuses();

            if (statuses.length > 0) {
                StatusManager.setStatuses(statuses);
            }

            const settings = await this.storage.loadSettings();

            if (settings) {
                // TODO: set server settings
            }
        } catch (error) {
            console.log(`[storage/manager] Couldn't set up status persistence for type ${this.storage.name}.`);
            console.log(error);
            process.exit(1);
        }
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
