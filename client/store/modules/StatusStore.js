import { STATUS_GET_GLOBAL_STATE } from '../StaticGetters';
import { STATUS_SET_STATUSES } from '../StaticMutations';

const state = {
    statuses: [],
};

const getters = {
    [STATUS_GET_GLOBAL_STATE]: state => {
        if (state.statuses.find(status => status.state === 'error')) {
            return 'error';
        }

        if (state.statuses.find(status => status.state === 'warning')) {
            return 'warning';
        }

        return 'success';
    },
};

const actions = {};

const mutations = {
    [STATUS_SET_STATUSES](state, statuses) {
        state.statuses = statuses;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
