import moment from 'moment';

import { CONTRIBUTOR_GET_ORDERED } from '../StaticGetters';
import { CONTRIBUTOR_FETCH_CONTRIBUTORS } from '../StaticActions';
import { CONTRIBUTOR_SET_CONTRIBUTORS } from '../StaticMutations';
import API from '../../classes/api.js';

const state = {
    contributors: [],
    lastFetched: null,
};

const getters = {
    [CONTRIBUTOR_GET_ORDERED]: state => {
        return state.contributors;
    },
};

const actions = {
    [CONTRIBUTOR_FETCH_CONTRIBUTORS]({ commit, state }) {
        const lastFetched = moment(state.lastFetched);
        const oneHourAgo = moment().subtract(1, 'hour');

        if (!state.lastFetched || lastFetched.isBefore(oneHourAgo)) {
            API.get('/contributors').then(response => {
                commit(CONTRIBUTOR_SET_CONTRIBUTORS, response.data.contributors);
            });
        }
    },
};

const mutations = {
    [CONTRIBUTOR_SET_CONTRIBUTORS](state, contributors) {
        state.contributors = contributors;
        state.lastFetched = moment().format();
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
