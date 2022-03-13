import Status from 'types/status';

export type StateType = {
    statuses: Status[];
};

export type SetAllStatusAction = {
    type: 'set-all-status';
    statuses: Status[];
};

export type ActionTypes = SetAllStatusAction;
