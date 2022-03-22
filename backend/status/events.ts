import EventEmitter from 'events';

class StatusEvents extends EventEmitter {
    event = {
        newStatus: 'status-new',
        patchStatus: 'status-patch',
        deleteStatus: 'status-delete',
        deleteAllStatuses: 'status-delete-all',
    };
}

export default new StatusEvents();
