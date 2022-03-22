import { ActionTypes, StateType } from './types';

import Status from '/types/status';

export const defaultState: StateType = {
    received: false,
    statuses: [],
};

const byTime = (StatusA: Status, StatusB: Status): number =>
    new Date(StatusB.time).getTime() - new Date(StatusA.time).getTime();

const reducer = (state = defaultState, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'status-set-all':
            return {
                ...state,
                received: true,
                statuses: action.statuses.sort(byTime),
            };
        case 'status-add':
            return {
                ...state,
                received: true,
                statuses: [...state.statuses, action.status].sort(byTime),
            };
        case 'status-patch':
            return {
                ...state,
                received: true,
                statuses: state.statuses
                    .map((status) => {
                        if (status.id === action.status.id) {
                            return action.status;
                        }

                        return status;
                    })
                    .sort(byTime),
            };
        case 'status-delete':
            return {
                ...state,
                statuses: state.statuses.filter((status) => status.id !== action.statusId),
            };
        default:
            return state;
    }
};

export default reducer;
