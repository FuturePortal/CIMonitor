import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import SettingStore from './modules/SettingStore.js';
import StatusStore from './modules/StatusStore.js';
import ContributorStore from './modules/ContributorStore.js';

Vue.use(Vuex);

const Store = new Vuex.Store({
    modules: {
        settings: SettingStore,
        statuses: StatusStore,
        contributors: ContributorStore,
    },
    plugins: [
        createPersistedState({
            key: `cimonitor`,
        }),
    ],
});

export default Store;
