import moment from 'moment';

import { CONTRIBUTOR_GET_ORDERED } from '../StaticGetters';
import { CONTRIBUTOR_FETCH_CONTRIBUTORS } from '../StaticActions';
import { CONTRIBUTOR_SET_CONTRIBUTORS } from '../StaticMutations';

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
            console.log('Fetching contributors...');
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    const result = JSON.parse(xmlHttp.responseText);
                    commit(CONTRIBUTOR_SET_CONTRIBUTORS, result.contributors);
                }
            };
            xmlHttp.open('GET', '/contributors', true);
            xmlHttp.send(null);
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
