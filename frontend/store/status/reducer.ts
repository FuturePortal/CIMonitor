import { ActionTypes, StateType } from './types';

const defaultState: StateType = {
    status: [],
};

const reducer = (state = defaultState, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'set-all-status':
            return {
                ...state,
                status: action.status,
            };
        default:
            return state;
    }
};

export default reducer;
