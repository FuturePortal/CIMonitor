import Vue from 'vue';
import VueSocketIo from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Vuex from 'vuex';

import Dashboard from './components/Dashboard';
import Store from './store';
import socketEvents from '../shared/socketEvents';
import { STATUS_SET_STATUSES } from './store/StaticMutations';
import { STATUS_GET_GLOBAL_STATE } from './store/StaticGetters';
import VersionChecker from './classes/VersionChecker';
import CIMonitorLogo from './components/EmptyBoard/logo.png';

Vue.use(VueSocketIo, io());
Vue.use(Vuex);

Vue.component(`dashboard`, Dashboard);

new Vue({
    el: '#app',
    store: Store,
    data() {
        return {
            isConnected: false,
        };
    },
    created() {
        document.title = document.title + ' | ' + location.host;
    },
    methods: {
        updateFavicon(globalState) {
            document
                .querySelector('link[rel="shortcut icon"]')
                .setAttribute('href', `/images/favicon/${globalState}.png`);
        },
        pushNotification(status) {
            if (!this.$store.state.settings.pushNotifications) {
                return;
            }

            if (!this.$store.state.settings.notificationStatuses[status.state]) {
                return;
            }

            try {
                new Notification(`CIMonitor • ${status.state}`, {
                    body: `${status.title}${status.subTitle ? ` • ${status.subTitle}` : ''}: ${status.state}`,
                    icon: CIMonitorLogo,
                });
            } catch (error) {
                // do nothing.
            }
        },
    },
    sockets: {
        connect() {
            console.log('Socket connected.');
            this.isConnected = true;

            // Check if the (re-)connect happened because of a server update
            VersionChecker.checkForNewVersion();
        },
        disconnect() {
            console.log('Socket disconnected :(');
            this.isConnected = false;
        },
        [socketEvents.statusesUpdated](statuses) {
            this.$store.commit(STATUS_SET_STATUSES, statuses);

            this.updateFavicon(this.$store.getters[STATUS_GET_GLOBAL_STATE]);
        },
        [socketEvents.eventTriggerStatus](status) {
            this.pushNotification(status);
        },
    },
});
