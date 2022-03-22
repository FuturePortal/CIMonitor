import FileSystem from 'fs';

import StorageType from 'backend/storage/type';
import ServerSettings from 'types/server';
import Status from 'types/status';

class JsonStorage extends StorageType {
    name = 'json';
    storagePath = 'storage';
    settingsFile = `${this.storagePath}/settings.json`;
    statusesFile = `${this.storagePath}/statuses.json`;

    validateEnvironment() {
        this.createStorageFolder();

        console.log('[storage/type/json] Ready to store.');

        return true;
    }

    async loadSettings(): Promise<ServerSettings> {
        console.log('[storage/type/json] Loading settings...');
        let settings = {};

        if (!FileSystem.existsSync(this.settingsFile)) {
            console.log('[storage/type/json] No settings file exists yet.');
            return settings;
        }

        try {
            settings = JSON.parse(String(FileSystem.readFileSync(this.settingsFile)));
        } catch (error) {
            console.log('[storage/type/json] Failed to load settings, manual check required.');
            process.exit(1);
            return settings;
        }

        console.log('[storage/type/json] Settings loaded.');
        return settings;
    }

    async loadStatuses(): Promise<Status[]> {
        console.log('[storage/type/json] Loading statuses...');

        let statuses = [];

        if (!FileSystem.existsSync(this.statusesFile)) {
            console.log('[storage/type/json] No status file exists yet.');
            return statuses;
        }

        try {
            statuses = JSON.parse(String(FileSystem.readFileSync(this.statusesFile)));
        } catch (error) {
            console.log('[storage/type/json] Failed to load statuses, manual check required.');
            process.exit(1);
            return statuses;
        }

        console.log('[storage/type/json] Statuses loaded.');
        return statuses;
    }

    saveSettings(settings: ServerSettings): void {
        this.createStorageFolder();

        try {
            FileSystem.writeFileSync(this.settingsFile, JSON.stringify(settings, null, 4));
        } catch (error) {
            console.log('[storage/type/json] Failed to save the settings.');
            console.log(error);
        }
    }

    saveStatuses(statuses: Status[]): void {
        this.createStorageFolder();

        try {
            FileSystem.writeFileSync(this.statusesFile, JSON.stringify(statuses, null, 4));
        } catch (error) {
            console.log('[storage/type/json] Failed to save the statuses.');
            console.log(error);
        }
    }

    createStorageFolder() {
        if (!FileSystem.existsSync(this.storagePath)) {
            console.log('[storage/type/json] Created storage folder as it did not exist yet.');
            FileSystem.mkdirSync(this.storagePath);
        }
    }
}

export default new JsonStorage();
