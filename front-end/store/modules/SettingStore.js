import { SETTINGS_PANEL_TOGGLE, SETTINGS_TOGGLE_NOTIFICATIONS } from '../StaticActions';
import {
    SETTINGS_SET_PANEL_OPEN,
    SETTINGS_SET_PANEL_CLOSED,
    SETTINGS_SET_NOTIFICATIONS_ON,
    SETTINGS_SET_NOTIFICATIONS_OFF,
    SETTINGS_SET_NOTIFICATION_STATUSES,
} from '../StaticMutations';

const state = {
    settingsPanelOpen: false,
    pushNotifications: false,
    notificationStatuses: {
        info: true,
        warning: true,
        error: true,
        success: true,
    },
};

const getters = {};

const actions = {
    [SETTINGS_PANEL_TOGGLE]({ commit, state }) {
        commit(state.settingsPanelOpen ? SETTINGS_SET_PANEL_CLOSED : SETTINGS_SET_PANEL_OPEN);
    },

    [SETTINGS_TOGGLE_NOTIFICATIONS]({ commit, state }) {
        commit(state.pushNotifications ? SETTINGS_SET_NOTIFICATIONS_OFF : SETTINGS_SET_NOTIFICATIONS_ON);
    },
};

const mutations = {
    [SETTINGS_SET_PANEL_OPEN](state) {
        state.settingsPanelOpen = true;
    },

    [SETTINGS_SET_PANEL_CLOSED](state) {
        state.settingsPanelOpen = false;
    },

    [SETTINGS_SET_NOTIFICATIONS_ON](state) {
        state.pushNotifications = true;
    },

    [SETTINGS_SET_NOTIFICATIONS_OFF](state) {
        state.pushNotifications = false;
    },

    [SETTINGS_SET_NOTIFICATION_STATUSES](state, statuses) {
        state.notificationStatuses = statuses;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
