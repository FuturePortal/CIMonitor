<template>
    <div>
        <p>
            By enabling desktop notifications, you'll receive a push message for every new status pushed to the
            dashboard.
        </p>
        <p>
            <strong>Note:</strong> If you deny the push notification pup-up, you'll have to re-enable them in your
            browser settings. You can dissable the dashboard notifications any time you like below.
        </p>
        <button class="option" @click="dissableNotifications" :class="{ current: !pushNotifications }">
            No desktop notifications
        </button>
        <button class="option" @click="enableNotifications" :class="{ current: pushNotifications }">
            Enable desktop notifications
        </button>
    </div>
</template>

<script>
import CIMonitorLogo from '../../../EmptyBoard/logo.png';
import { SETTINGS_SET_NOTIFICATIONS_ON, SETTINGS_SET_NOTIFICATIONS_OFF } from '../../../../store/StaticMutations';

export default {
    methods: {
        enableNotifications() {
            Notification.requestPermission().then(() => {
                new Notification(`CIMonitor`, {
                    body: `Notifications are enabled!`,
                    icon: CIMonitorLogo,
                });
            });
            this.$store.commit(SETTINGS_SET_NOTIFICATIONS_ON);
        },
        dissableNotifications() {
            this.$store.commit(SETTINGS_SET_NOTIFICATIONS_OFF);
        },
    },
    computed: {
        pushNotifications() {
            return this.$store.state.settings.pushNotifications;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.option
    @extend %radio-option

hr
    @extend %line-break
</style>
