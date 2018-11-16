const Events = require('../Events');
const Status = require('./Status');
const staticEvents = require('../../../shared/socketEvents');

class StatusManager {
    constructor() {
        this.statuses = [];

        this.setListeners();
    }

    setListeners() {
        Events.watch(Events.event.newStatus, status => this.onNewStatus(status));

        console.log('[StatusManager] Listening to incoming statuses...');
    }

    /**
     * @param {Status} status
     */
    processStatus(status) {
        const existingStatus = this.statuses.find(existingStatus => existingStatus.getKey() === status.getKey());

        if (existingStatus) {
            console.log('[StatusManager] Status already exists, replacing the old status.');
            const index = this.statuses.indexOf(existingStatus);
            this.statuses[index] = status;
            return;
        }

        console.log('[StatusManager] Adding new status to the statuses.');
        this.statuses.push(status);
    }

    getStatuses() {
        return (
            this.statuses
                // Get raw data only
                .map(status => status.getRawData())
                // Newest updates first
                .sort((statusA, statusB) => statusA.time < statusB.time)
        );
    }

    /**
     * @return Status
     */
    getStatusByKey(statusKey) {
        return this.statuses.find(status => status.getKey() === statusKey);
    }

    /**
     * @param {Status} status
     */
    onNewStatus(status) {
        console.log('[StatusManager] Received new status.');

        this.processStatus(status);

        // @todo: Remove old statuses

        Events.push(Events.event.statusesUpdated);
    }

    removeStatus(statusKey) {
        const existingStatus = this.statuses.find(existingStatus => existingStatus.getKey() === statusKey);

        if (existingStatus) {
            const index = this.statuses.indexOf(existingStatus);
            this.statuses.splice(index, 1);
            console.log(`[StatusManager] Removed status with key ${statusKey}.`);
            Events.push(Events.event.statusesUpdated);
            return;
        }

        console.log(`[StatusManager] No status found with key ${statusKey}.`);
    }

    reset() {
        this.statuses = [];

        Events.push(Events.event.statusesUpdated);
    }
}

module.exports = new StatusManager();
