import StorageManager from 'backend/storage/manager';
import Status, { Process, State } from 'types/status';

import StatusEvents from './events';

class StatusManager {
    statuses: Status[] = [];

    setStatuses(statuses: Status[]) {
        this.statuses = statuses;
    }

    getStatus(id: string): Status | null {
        const status = this.statuses.find((status) => status.id === id);

        if (!status) {
            return null;
        }

        return status;
    }

    clearStatuses() {
        this.statuses = [];

        StorageManager.saveStatuses([]);
    }

    deleteStatus(statusId: string) {
        const statuses = this.statuses.filter((status) => status.id !== statusId);

        this.statuses = statuses;

        StorageManager.saveStatuses(statuses);

        StatusEvents.emit(StatusEvents.event.deleteStatus, statusId);
    }

    deleteAllStatuses() {
        this.statuses = [];

        StorageManager.saveStatuses([]);

        StatusEvents.emit(StatusEvents.event.deleteAllStatuses);
    }

    setStatus(status: Status): void {
        let replaced = false;

        const statuses = [
            ...this.statuses.map((existingStatus) => {
                if (existingStatus.id === status.id) {
                    const updatedStatus = this.cleanStatus(status);
                    console.log(`[status/manager] Replaced existing status ${updatedStatus.id}.`);
                    StatusEvents.emit(StatusEvents.event.patchStatus, updatedStatus);
                    replaced = true;
                    return updatedStatus;
                }

                return existingStatus;
            }),
        ];

        if (!replaced) {
            statuses.push(status);
            StatusEvents.emit(StatusEvents.event.newStatus, status);
            console.log(`[status/manager] Added new status ${status.id}.`);
        }

        this.statuses = statuses;

        StorageManager.saveStatuses(statuses);
    }

    cleanStatus(status: Status): Status {
        const processes = status.processes
            // Sort processes by creation time
            .sort(
                (processA: Process, processB: Process): number =>
                    new Date(processB.time).getTime() - new Date(processA.time).getTime()
            )
            // Remove all processes that are not the latest or not warning
            .filter((process, index) => index === 0 || process.state === 'warning');

        return {
            ...status,
            state: this.determineStatusState(processes),
            processes,
        };
    }

    determineStatusState(processes: Process[]): State {
        if (processes.find((processes) => processes.state === 'error')) {
            return 'error';
        }

        if (processes.find((processes) => processes.state === 'warning')) {
            return 'warning';
        }

        if (processes.find((processes) => processes.state === 'success')) {
            return 'success';
        }

        return 'info';
    }

    init(): void {
        console.log('[status/manager] Init.');

        this.removeOldStatuses();

        // Check every 5 minutes for old statuses
        setInterval(() => this.removeOldStatuses(), 1000 * 60 * 5);
    }

    removeOldStatuses() {
        let deleteCount = 0;

        // Removes statuses when they're older than a week
        const removeAfterMilliseconds = 1000 * 60 * 60 * 24 * 7;
        const expiredTime = new Date().getTime() - removeAfterMilliseconds;

        this.statuses.map((status) => {
            if (new Date(status.time).getTime() < expiredTime) {
                deleteCount++;
                this.deleteStatus(status.id);
            }
        });

        if (deleteCount > 0) {
            console.log(`[status/manager] Deleted ${deleteCount} expired statuses.`);
        }
    }

    getStatuses(): Status[] {
        return this.statuses;
    }
}

export default new StatusManager();
