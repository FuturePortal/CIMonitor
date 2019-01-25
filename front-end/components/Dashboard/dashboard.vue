<template>
    <div>
        <div class="dashboard">
            <status v-for="status in statuses" :status="status" :key="status.key" :now="now" />
            <empty-board v-if="hasNoStatuses" />
            <video-overlay />
            <no-connection v-if="isNotConnected" />
            <tool-bar :state="globalState" />
        </div>
        <settings-panel />
    </div>
</template>

<script>
import ToolBar from '../ToolBar';
import Status from '../Status';
import VideoOverlay from '../VideoOverlay';
import SettingsPanel from '../SettingsPanel';
import { STATUS_GET_GLOBAL_STATE, STATUS_GET_STATUSES_ORDERED } from '../../store/StaticGetters';
import EmptyBoard from '../EmptyBoard';
import NoConnection from '../NoConnection';

export default {
    components: { ToolBar, Status, VideoOverlay, SettingsPanel, EmptyBoard, NoConnection },
    data() {
        return {
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
        globalState() {
            return this.$store.getters[STATUS_GET_GLOBAL_STATE];
        },
        statuses() {
            return this.$store.getters[STATUS_GET_STATUSES_ORDERED];
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.dashboard
    min-height: 100vh
    background: $color-antracite
</style>
