import Status from 'types/status';

import { ActionTypes, StateType } from './types';

export const defaultState: StateType = {
    statuses: [],
};

const byTime = (StatusA: Status, StatusB: Status): number =>
    new Date(StatusB.time).getTime() - new Date(StatusA.time).getTime();

const reducer = (state = defaultState, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'status-set-all':
            return {
                ...state,
                statuses: action.statuses.sort(byTime),
            };
        case 'status-add':
            return {
                ...state,
                statuses: [...state.statuses, action.status].sort(byTime),
            };
        case 'status-patch':
            return {
                ...state,
                statuses: state.statuses
                    .map((status) => {
                        if (status.id === action.status.id) {
                            return action.status;
                        }

                        return status;
                    })
                    .sort(byTime),
            };
        default:
            return state;
    }
};

export default reducer;
