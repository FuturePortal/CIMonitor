import Vue from 'vue';
import VueSocketIo from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Vuex from 'vuex';

import Dashboard from './components/Dashboard';
import Store from './store';

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
    sockets: {
        connect() {
            console.log('Socket connected.');
            this.isConnected = true;
        },
        disconnect() {
            console.log('Socket disconnected :(');
            this.isConnected = false;
        },
    },
});
