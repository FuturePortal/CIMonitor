import { ActionTypes, StateType } from './types';

const defaultState: StateType = {
    open: false,
};

const reducer = (state = defaultState, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'settings-panel-toggle':
            return {
                ...state,
                open: !state.open,
            };
        case 'settings-panel-close':
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
};

export default reducer;
