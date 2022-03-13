import EventEmitter from 'events';

class StatusEvents extends EventEmitter {
    event = {
        newStatus: 'status-new',
        patchStatus: 'status-patch',
        deleteStatus: 'status-delete',
    };
}

export default new StatusEvents();
