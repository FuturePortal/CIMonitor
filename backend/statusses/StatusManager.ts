import Status from 'types/status';

class StatusManager {
    statusses: Status[] = [];

    init(): void {
        console.log('[StatusManager] init.');
    }

    getStatusses(): Status[] {
        return this.statusses;
    }
}

export default new StatusManager();
