import { SETTINGS_PANEL_TOGGLE } from '../StaticActions';
import { SETTINGS_PANEL_SET_OPEN, SETTINGS_PANEL_SET_CLOSED } from '../StaticMutations';

const state = {
    settingsPanelOpen: false,
};

const getters = {};

const actions = {
    [SETTINGS_PANEL_TOGGLE]({ commit, state }) {
        console.log('Toggling the settings panel.');
        commit(state.settingsPanelOpen ? SETTINGS_PANEL_SET_CLOSED : SETTINGS_PANEL_SET_OPEN);
    },
};

const mutations = {
    [SETTINGS_PANEL_SET_OPEN](state) {
        console.log('Setting settings panel open.');
        state.settingsPanelOpen = true;
    },

    [SETTINGS_PANEL_SET_CLOSED](state) {
        console.log('Setting settings panel closed.');
        state.settingsPanelOpen = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
