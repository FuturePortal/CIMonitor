const Events = require('../../Events');

class AbstractPersister {
    onStatusesUpdated() {
        throw new Error('Implement onStatusesUpdated()');
    }

    saveStatusesOnChange() {
        Events.watch(Events.event.statusesUpdated, () => this.onStatusesUpdated());
    }

    loadSavedStatuses() {
        throw new Error('Implement loadSavedStatuses()');
    }
}

module.exports = AbstractPersister;
