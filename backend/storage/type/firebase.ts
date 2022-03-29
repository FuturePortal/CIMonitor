import FirebaseAdmin from 'firebase-admin';

import FirebaseDataParser from 'backend/parser/firebase';
import StorageType from 'backend/storage/type';
import { ServerSettings } from 'types/cimonitor';
import { ModuleSettings } from 'types/module';
import Status from 'types/status';

class FirebaseStorage extends StorageType {
    name = 'firebase';
    database = null;

    validateEnvironment(): boolean {
        if (!process.env.FIREBASE_URL) {
            console.info('[storage/type/firebase] Missing FIREBASE_URL, which is required for STORAGE_TYPE=firebase.');
            return false;
        }

        if (!process.env.FIREBASE_KEY_FILE) {
            console.info(
                '[storage/type/firebase] Missing FIREBASE_KEY_FILE, which is required for STORAGE_TYPE=firebase.'
            );
            return false;
        }

        FirebaseAdmin.initializeApp({
            databaseURL: process.env.FIREBASE_URL,
            credential: FirebaseAdmin.credential.cert(process.env.FIREBASE_KEY_FILE),
        });

        this.database = FirebaseAdmin.database();
        return true;
    }

    async load(key: string): Promise<any> {
        const dataResponse = await this.database.ref(key).once('value');

        return FirebaseDataParser.convertObjectArraysToArrays(dataResponse.toJSON());
    }

    save(key: string, data: any) {
        try {
            return this.database.ref(key).set(data);
        } catch (error) {
            console.error(`[storage/type/firebase] ${error}`);
        }
    }

    async loadSettings(): Promise<ServerSettings> {
        try {
            return this.load('settings');
        } catch (error) {
            console.error(`[storage/type/firebase] ${error}`);
            console.log(`[storage/type/firebase] Returning default settings`);
            return {};
        }
    }

    async loadModules(): Promise<ModuleSettings> {
        try {
            return this.load('modules');
        } catch (error) {
            console.error(`[storage/type/firebase] ${error}`);
            console.log(`[storage/type/firebase] Returning default settings`);
            return {
                triggers: [],
                events: [],
            };
        }
    }

    async loadStatuses(): Promise<Status[]> {
        const statuses = await this.load('statuses');

        if (!statuses) {
            return [];
        }

        // Make sure that everything that should be an array of a status, is an array.
        return this.fixStatusArrays(statuses);
    }

    saveSettings(settings: ServerSettings): void {
        this.save('settings', settings);
    }

    saveStatuses(statuses: Status[]): void {
        this.save('statuses', statuses);
    }

    fixStatusArrays(statuses: Status[]): Status[] {
        return statuses.map((status) => {
            if (!status.processes) {
                status.processes = [];
            }

            status.processes.map((process) => {
                if (!process.stages) {
                    process.stages = [];
                }

                process.stages.map((stage) => {
                    if (!stage.steps) {
                        stage.steps = [];
                    }

                    return stage;
                });

                return process;
            });

            return status;
        });
    }
}

export default new FirebaseStorage();
