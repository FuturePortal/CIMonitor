import Vue from 'vue';
import VueSocketIo from 'vue-socket.io-extended';
import io from 'socket.io-client';

import Dashboard from './components/Dashboard';

Vue.use(VueSocketIo, io());

Vue.component(`dashboard`, Dashboard);

new Vue({
    el: '#app',
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
