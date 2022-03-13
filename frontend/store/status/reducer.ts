import { ActionTypes, StateType } from './types';

const defaultState: StateType = {
    statuses: [],
};

const reducer = (state = defaultState, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'status-set-all':
            return {
                ...state,
                statuses: action.statuses,
            };
        case 'status-add':
            return {
                ...state,
                statuses: [...state.statuses, action.status],
            };
        case 'status-patch':
            return {
                ...state,
                statuses: state.statuses.map((status) => {
                    if (status.id === action.status.id) {
                        return action.status;
                    }

                    return status;
                }),
            };
        default:
            return state;
    }
};

export default reducer;
