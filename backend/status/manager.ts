import StorageManager from 'backend/storage/manager';
import Status from 'types/status';

import StatusEvents from './events';
import { fixStuckStatus, getExpiredStatuses, getGlobalState, getStuckStatuses, processStatusChanges } from './helper';

class StatusManager {
	statuses: Status[] = [];

	setStatuses(statuses: Status[]) {
		this.statuses = statuses;
	}

	getStatuses(): Status[] {
		return this.statuses;
	}

	getStatus(id: string): Status | null {
		const status = this.statuses.find((status) => status.id === id);

		if (!status) {
			return null;
		}

		return status;
	}

	deleteStatus(statusId: string) {
		const statuses = this.statuses.filter((status) => status.id !== statusId);

		this.statuses = statuses;

		// TODO: fix dependency, storage manager should listen instead
		StorageManager.saveStatuses(statuses);

		StatusEvents.emit(StatusEvents.event.deleteStatus, statusId);
	}

	deleteAllStatuses() {
		this.statuses = [];

		// TODO: fix dependency, storage manager should listen instead
		StorageManager.saveStatuses([]);

		StatusEvents.emit(StatusEvents.event.deleteAllStatuses);
	}

	setStatus(status: Status): void {
		status = processStatusChanges(status);
		let replacedStatus = false;

		const statuses = [
			...this.statuses.map((existingStatus) => {
				if (existingStatus.id === status.id) {
					const isStateChanged = existingStatus.state !== status.state;

					console.log(
						`[status/manager] Replaced existing status ${status.id}${
							isStateChanged ? ` with new state ${status.state}` : ''
						}.`
					);
					StatusEvents.emit(StatusEvents.event.patchStatus, status);

					if (isStateChanged) {
						StatusEvents.emit(StatusEvents.event.statusStateChange, status);
					}

					replacedStatus = true;
					return status;
				}

				return existingStatus;
			}),
		];

		if (!replacedStatus) {
			statuses.push(status);
			console.log(`[status/manager] Added new status ${status.id} with state ${status.state}.`);
			StatusEvents.emit(StatusEvents.event.newStatus, status);
		}

		this.statuses = statuses;

		StatusEvents.emit(StatusEvents.event.globalStateChange, getGlobalState(statuses));

		// TODO: fix dependency, storage manager should listen instead
		// beware of the race condition that events are emit before the statuses are set on the manager
		StorageManager.saveStatuses(statuses);
	}

	init(): void {
		console.log('[status/manager] Init.');

		this.statusHealthCheck();

		// Do a status health check every minute
		setInterval(() => this.statusHealthCheck(), 1000 * 60);
	}

	statusHealthCheck() {
		const expiredStatuses = getExpiredStatuses(this.statuses);
		for (let expiredStatus of expiredStatuses) {
			console.log(`[status/manager] Deleted status ${expiredStatus.id} because it expired.`);
			this.deleteStatus(expiredStatus.id);
		}

		const stuckStatuses = getStuckStatuses(this.statuses);
		for (let stuckStatus of stuckStatuses) {
			console.log(`[status/manager] Status ${stuckStatus.id} was stuck, patched timeout state.`);
			this.setStatus(fixStuckStatus(stuckStatus));
		}
	}
}

export default new StatusManager();
