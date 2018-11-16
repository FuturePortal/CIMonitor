<template>
    <div class="dashboard">
        <status v-if="isNotConnected" :status="notConnectedStatus" />
        <status v-if="hasNoStatuses" :status="noStatusesStatus" />
        <status v-for="status in statuses" :status="status" :key="status.key" :now="now" />
        <tool-bar />
    </div>
</template>

<script>
import socketEvents from '../../../shared/socketEvents';
import ToolBar from '../ToolBar';
import Status from '../Status';
import SateliteImage from './satelite.svg';

export default {
    components: { ToolBar, Status },
    data() {
        return {
            statuses: [],
            now: this.getCurrentTimestamp(),
        };
    },
    created() {
        setInterval(this.setNow, 5000);
    },
    methods: {
        getCurrentTimestamp: function() {
            return new Date().getTime();
        },
        setNow() {
            this.now = this.getCurrentTimestamp();
        },
    },
    computed: {
        isNotConnected() {
            return !this.$root.isConnected;
        },
        hasNoStatuses() {
            return this.statuses.length === 0;
        },
        notConnectedStatus() {
            return {
                key: 'not-connected',
                state: 'error',
                title: 'Not connected',
                subTitle: 'There is no socket connection with the server, new statuses wont be shown.',
            };
        },
        noStatusesStatus() {
            return {
                key: 'no-statuses',
                state: 'info',
                title: 'No statuses',
                subTitle: 'Waiting for new statuses to be pushed to the server.',
                image: SateliteImage,
            };
        },
    },
    sockets: {
        [socketEvents.statusesUpdated](statuses) {
            console.log('New statuses updated event!');
            this.statuses = statuses;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>

</style>
