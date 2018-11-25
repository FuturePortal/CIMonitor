<template>
    <div class="dashboard">
        <status v-if="isNotConnected" :status="notConnectedStatus" />
        <status v-if="hasNoStatuses" :status="noStatusesStatus" />
        <status v-for="status in statuses" :status="status" :key="status.key" :now="now" />
        <video-overlay />
        <tool-bar :state="globalState" />
        <settings-panel />
    </div>
</template>

<script>
import socketEvents from '../../../shared/socketEvents';
import ToolBar from '../ToolBar';
import Status from '../Status';
import VideoOverlay from '../VideoOverlay';
import SateliteImage from './satelite.svg';
import SettingsPanel from '../SettingsPanel';

export default {
    components: { ToolBar, Status, VideoOverlay, SettingsPanel },
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
        updateFavicon() {
            document
                .querySelector('link[rel="shortcut icon"]')
                .setAttribute('href', `/images/favicon/${this.globalState}.png`);
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
        globalState() {
            if (this.statuses.find(status => status.state === 'error')) {
                return 'error';
            }

            if (this.statuses.find(status => status.state === 'warning')) {
                return 'warning';
            }

            return 'success';
        },
    },
    sockets: {
        [socketEvents.statusesUpdated](statuses) {
            this.statuses = statuses;
            this.updateFavicon();
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped></style>
