import Vue from 'vue';

class EventManager {
    constructor() {
        this.vue = new Vue();

        this.events = {
            socketConnected: 'socketConnected',
        };
    }

    trigger(event, data = {}) {
        console.log(`[Event] Triggered ${event}`);
        this.vue.$emit(event, data);
    }

    watch(event, callback) {
        this.vue.$on(event, callback);
    }

    waitFor(event, callback) {
        this.vue.$once(event, callback);
    }

    stopWatching(event) {
        this.vue.$off(event);
    }
}

export default (EventManager = new EventManager()); // eslint-disable-line no-class-assign
