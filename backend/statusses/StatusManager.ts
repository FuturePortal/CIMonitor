import Status from 'types/status';

class StatusManager {
    statuses: Status[] = [];

    getStatus(id: string): Status | null {
        const status = this.statuses.find((status) => status.id === id);

        if (!status) {
            return null;
        }

        return status;
    }

    setStatus(status: Status): void {
        let replaced = false;

        const statuses = [
            ...this.statuses.map((existingStatus) => {
                if (existingStatus.id === status.id) {
                    console.log(`[StatusManager] Replaced existing status ${status.id}.`);
                    replaced = true;
                    return status;
                }

                return existingStatus;
            }),
        ];

        if (!replaced) {
            statuses.push(status);
            console.log(`[StatusManager] Added new status ${status.id}.`);
        }

        this.statuses = statuses;

        // TODO: trigger status added or updated
    }

    init(): void {
        console.log('[StatusManager] init.');
    }

    getStatuses(): Status[] {
        return this.statuses;
    }
}

export default new StatusManager();
