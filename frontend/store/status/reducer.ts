import { ActionTypes, StateType } from './types';

const defaultState: StateType = {
    statuses: [],
};

const reducer = (state = defaultState, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'set-all-status':
            return {
                ...state,
                statuses: action.statuses,
            };
        default:
            return state;
    }
};

export default reducer;
