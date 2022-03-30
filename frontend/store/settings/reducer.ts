import { ActionTypes, StateType } from './types';

const defaultState: StateType = {
    open: false,
    showCompleted: false,
    sizeModifier: 1,
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
        case 'settings-show-completed-toggle':
            return {
                ...state,
                showCompleted: !state.showCompleted,
            };
        case 'settings-size-modifier-set':
            return {
                ...state,
                sizeModifier: action.sizeModifier,
            };
        default:
            return state;
    }
};

export default reducer;
