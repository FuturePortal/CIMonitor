<template>
    <div class="dashboard">
        <status v-if="isNotConnected" :status="noConnectionStatus" />
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
import SettingsPanel from '../SettingsPanel';
import { STATUS_CONNECTION_LOST, STATUS_NO_STATUSES } from '../Status/staticStatuses.js';

export default {
    components: { ToolBar, Status, VideoOverlay, SettingsPanel },
    data() {
        return {
            statuses: [],
            now: this.getCurrentTimestamp(),
            noConnectionStatus: STATUS_CONNECTION_LOST,
            noStatusesStatus: STATUS_NO_STATUSES,
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
