import { SETTINGS_PANEL_TOGGLE } from '../StaticActions';
import { SETTINGS_SET_PANEL_OPEN, SETTINGS_SET_PANEL_CLOSED, SETTINGS_SET_THEME } from '../StaticMutations';

const state = {
    settingsPanelOpen: false,
    theme: 'basic-dark',
};

const getters = {};

const actions = {
    [SETTINGS_PANEL_TOGGLE]({ commit, state }) {
        commit(state.settingsPanelOpen ? SETTINGS_SET_PANEL_CLOSED : SETTINGS_SET_PANEL_OPEN);
    },
};

const mutations = {
    [SETTINGS_SET_PANEL_OPEN](state) {
        state.settingsPanelOpen = true;
    },

    [SETTINGS_SET_PANEL_CLOSED](state) {
        state.settingsPanelOpen = false;
    },

    [SETTINGS_SET_THEME](state, theme) {
        state.theme = theme;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
