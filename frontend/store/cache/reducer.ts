import { ActionTypes, StateType } from './types';

const defaultState: StateType = {
    version: null,
    lastVersionCheck: 0,
    contributors: [],
    lastContributorCheck: 0,
};

const reducer = (state = defaultState, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'cache-contributors-set':
            return {
                ...state,
                contributors: action.contributors,
                lastContributorCheck: new Date().getTime(),
            };
        case 'cache-version-set':
            return {
                ...state,
                version: action.version,
                lastVersionCheck: new Date().getTime(),
            };
        default:
            return state;
    }
};

export default reducer;
