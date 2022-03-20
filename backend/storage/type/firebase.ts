import StorageType from 'backend/storage/type';
import ServerSettings from 'types/server';
import Status from 'types/status';

class FirebaseStorage extends StorageType {
    name = 'firebase';

    validateEnvironment(): boolean {
        // TODO: finish firebase integration

        // TODO: check if the correct environment variables are set (FIREBASE_URL, FIREBASE_KEY_FILE)

        return false;
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

export default new FirebaseStorage();
