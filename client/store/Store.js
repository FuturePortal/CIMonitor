import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import SettingStore from './modules/SettingStore.js';

Vue.use(Vuex);

const Store = new Vuex.Store({
    modules: {
        settings: SettingStore,
    },
    plugins: [
        createPersistedState({
            key: `cimonitor`,
        }),
    ],
});

export default Store;
