import Status from 'types/status';

export type StateType = {
    statuses: Status[];
};

export type SetAllStatusAction = {
    type: 'status-set-all';
    statuses: Status[];
};

export type AddStatusAction = {
    type: 'status-add';
    status: Status;
};

export type PatchStatusAction = {
    type: 'status-patch';
    status: Status;
};

export type ActionTypes = SetAllStatusAction | AddStatusAction | PatchStatusAction;