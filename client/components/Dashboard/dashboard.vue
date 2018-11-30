<template>
    <div class="dashboard" :class="theme">
        <status v-if="isNotConnected" :status="noConnectionStatus" />
        <status v-if="hasNoStatuses" :status="noStatusesStatus" />
        <status v-for="status in statuses" :status="status" :key="status.key" :now="now" />
        <video-overlay />
        <tool-bar :state="globalState" />
        <settings-panel />
    </div>
</template>

<script>
import ToolBar from '../ToolBar';
import Status from '../Status';
import VideoOverlay from '../VideoOverlay';
import SettingsPanel from '../SettingsPanel';
import { STATUS_CONNECTION_LOST, STATUS_NO_STATUSES } from '../Status/staticStatuses';
import { STATUS_GET_GLOBAL_STATE, STATUS_GET_STATUSES_ORDERED } from '../../store/StaticGetters';

export default {
    components: { ToolBar, Status, VideoOverlay, SettingsPanel },
    data() {
        return {
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
    },
    computed: {
        isNotConnected() {
            return !this.$root.isConnected;
        },
        hasNoStatuses() {
            return this.statuses.length === 0;
        },
        globalState() {
            return this.$store.getters[STATUS_GET_GLOBAL_STATE];
        },
        statuses() {
            return this.$store.getters[STATUS_GET_STATUSES_ORDERED];
        },
        theme() {
            return `theme__${this.$store.state.settings.theme}`;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.dashboard
    min-height: 100vh
</style>
