import { combineReducers, compose, createStore } from 'redux';

import SettingReducer from './settings/reducer';
import StatusReducer from './status/reducer';

const reducers = combineReducers({
    status: StatusReducer,
    setting: SettingReducer,
});

export type RootState = ReturnType<typeof reducers>;

// Declare dev tools redux enhancer type
declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,no-unused-vars
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// Determine Redux enhancers
let composeEnhancers = compose;
if (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'CIMonitor' });
}

// Load current store state
const stateKey = 'CIMonitor-state';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStoreState = (): any => {
    const state = window.localStorage.getItem(stateKey);

    if (state) {
        return JSON.parse(state);
    }

    return {};
};

// Create Redux store with using saved state from local storage if present
const store = createStore(reducers, getStoreState(), composeEnhancers());

store.subscribe((): void => {
    window.localStorage.setItem(stateKey, JSON.stringify(store.getState()));
});

export default store;
