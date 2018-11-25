import Vue from 'vue';
import VueSocketIo from 'vue-socket.io-extended';
import io from 'socket.io-client';

import Dashboard from './components/Dashboard';

Vue.use(VueSocketIo, io());

Vue.component(`dashboard`, Dashboard);

Vue.directive('click-outside', {
    bind() {
        this.event = event => this.vm.$emit(this.expression, event);
        this.el.addEventListener('click', this.stopProp);
        document.body.addEventListener('click', this.event);
    },

    unbind() {
        this.el.removeEventListener('click', this.stopProp);
        document.body.removeEventListener('click', this.event);
    },

    stopProp(event) {
        event.stopPropagation();
    },
});

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
