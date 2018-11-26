import { STATUS_GET_GLOBAL_STATE, STATUS_GET_STATUSES_ORDERED } from '../StaticGetters';
import { STATUS_SET_STATUSES } from '../StaticMutations';
import moment from 'moment';

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
    [STATUS_GET_STATUSES_ORDERED]: state => {
        return state.statuses.sort((statusA, statusB) => {
            const timeA = moment(statusA.time);
            const timeB = moment(statusB.time);

            return timeA.isBefore(timeB) ? 1 : -1;
        });
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
