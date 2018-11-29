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
import ToolBar from '../ToolBar';
import Status from '../Status';
import VideoOverlay from '../VideoOverlay';
import SettingsPanel from '../SettingsPanel';
import { STATUS_CONNECTION_LOST, STATUS_NO_STATUSES } from '../Status/staticStatuses';
import { STATUS_GET_GLOBAL_STATE, STATUS_GET_STATUSES_ORDERED } from '../../store/StaticGetters';
import VersionChecker from './VersionChecker';
import EventManager from '../EventManager';

export default {
    components: { ToolBar, Status, VideoOverlay, SettingsPanel },
    props: {
        version: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            now: this.getCurrentTimestamp(),
            noConnectionStatus: STATUS_CONNECTION_LOST,
            noStatusesStatus: STATUS_NO_STATUSES,
        };
    },
    created() {
        setInterval(this.setNow, 5000);

        EventManager.watch(EventManager.events.socketConnected, () => this.checkForNewVersion());
    },
    methods: {
        checkForNewVersion() {
            VersionChecker.checkForNewVersion(this.version);
        },
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
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped></style>
