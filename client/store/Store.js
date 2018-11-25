import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import SettingStore from './modules/SettingStore.js';
import StatusStore from './modules/StatusStore.js';

Vue.use(Vuex);

const Store = new Vuex.Store({
    modules: {
        settings: SettingStore,
        statuses: StatusStore,
    },
    plugins: [
        createPersistedState({
            key: `cimonitor`,
        }),
    ],
});

export default Store;
