import Vue from 'vue';
import VueSocketIo from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Vuex from 'vuex';

import Dashboard from './components/Dashboard';
import Store from './store';
import socketEvents from '../shared/socketEvents';
import { STATUS_SET_STATUSES } from './store/StaticMutations';
import { STATUS_GET_GLOBAL_STATE } from './store/StaticGetters';
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
        document.title = `CIMonitor | ${location.host}`;
        this.cursorHide();
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
        cursorHide() {
            let cursorTimer;
            document.body.addEventListener('mousemove', event => {
                if (event.movementY > 0 || event.movementX > 0) {
                    window.clearTimeout(cursorTimer);
                    document.body.style.cursor = null;
                    if (this.$store.state.settings.cursorHidden) {
                        cursorTimer = window.setTimeout(() => {
                            document.body.style.cursor = 'none';
                        }, this.$store.state.settings.cursorHiddenTimeout);
                    }
                }
            });
            cursorTimer = window.setTimeout(() => {
                if (this.$store.state.settings.cursorHidden) {
                    document.body.style.cursor = 'none';
                }
            }, this.$store.state.settings.cursorHiddenTimeout);
        },
    },
    sockets: {
        connect() {
            console.log('Socket connected.');
            this.isConnected = true;
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
