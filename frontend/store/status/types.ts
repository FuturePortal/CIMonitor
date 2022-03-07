import Status from 'types/status';

export type StateType = {
    status: Status[];
};

export type SetAllStatusAction = {
    type: 'set-all-status';
    status: Status[];
};

export type ActionTypes = SetAllStatusAction;
