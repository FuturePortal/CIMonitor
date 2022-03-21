import FirebaseAdmin from 'firebase-admin';

import FirebaseDataParser from 'backend/parser/firebase';
import StorageType from 'backend/storage/type';
import ServerSettings from 'types/server';
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
        return this.database
            .ref(key)
            .once('value', function (data) {
                return data;
            })
            .then((data) => {
                return FirebaseDataParser.convertObjectArraysToArrays(data.toJSON());
            });
    }

    save(key: string, data: any) {
        try {
            return this.database.ref(key).set(data);
        } catch (error) {
            console.error(`[storage/type/firebase] ${error}`);
        }
    }

    async loadSettings(): Promise<ServerSettings> {
        return this.load('settings');
    }

    async loadStatuses(): Promise<Status[]> {
        const statuses = await this.load('statuses');

        if (!statuses) {
            return [];
        }

        return statuses;
    }

    saveSettings(settings: ServerSettings): void {
        this.save('settings', settings);
    }

    saveStatuses(statuses: Status[]): void {
        this.save('statuses', statuses);
    }
}

export default new FirebaseStorage();
