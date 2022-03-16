import Status, { Process, State } from 'types/status';

import StatusEvents from './events';

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
    }

    getStatuses(): Status[] {
        return this.statuses;
    }
}

export default new StatusManager();
