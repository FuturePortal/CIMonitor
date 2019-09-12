<template>
    <div>
        <password-protected>
            <div class="remove-all" v-if="statuses.length > 0">
                <button class="remove" @click="removeAll"><i class="fas fa-ban" /> remove all</button>
            </div>
            <h1>Statuses</h1>
            <p v-if="statuses.length === 0">
                There are no statuses yet in CIMonitor. <br />Learn how to push statuses in
                <a target="_blank" href="https://cimonitor.rtfd.io/">the documentation</a>.
            </p>
            <div class="row" v-for="status in statuses" :key="status.key">
                <div class="panel-status" :class="status.state">
                    <div class="title">
                        {{ status.title }}
                        <div v-if="status.subTitle" class="sub-title">
                            {{ status.subTitle }}
                        </div>
                    </div>
                    <div class="actions">
                        <button class="remove" @click="remove(status.key)"><i class="fas fa-ban" /> remove</button>
                    </div>
                </div>
            </div>
        </password-protected>
    </div>
</template>

<script>
import PasswordProtected from '../../../password-protected.vue';
import { STATUS_GET_STATUSES_ORDERED } from '../../../../store/StaticGetters';
import { SETTINGS_CLEAR_PASSWORD } from '../../../../store/StaticMutations';

export default {
    data() {
        return {};
    },
    components: { PasswordProtected },
    methods: {
        processRequest(xhttp) {
            xhttp.setRequestHeader('Authorization', this.$store.state.settings.password);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && (xhttp.status == 401 || xhttp.status == 403)) {
                    this.$store.commit(SETTINGS_CLEAR_PASSWORD);
                }
            };
            xhttp.send();
        },
        remove(statusKey) {
            const xhttp = new XMLHttpRequest();
            xhttp.open('DELETE', `/status/${statusKey}`, true);
            this.processRequest(xhttp);
        },
        removeAll() {
            const xhttp = new XMLHttpRequest();
            xhttp.open('GET', '/status/clear-all', true);
            this.processRequest(xhttp);
        },
    },
    computed: {
        statuses() {
            return this.$store.getters[STATUS_GET_STATUSES_ORDERED];
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.remove-all
    float: right

.row
    border-top: 2px solid $color-gray-lighter
    padding-bottom: 10px

.panel-status
    display: flex
    padding-left: 10px
    border-left: 5px solid $color-info
    margin-top: 10px

    &.success
        border-left: 5px solid $color-success

    &.warning
        border-left: 5px solid $color-warning

    &.error
        border-left: 5px solid $color-error

.title
    flex: 1
    font-size: 16px

.sub-title
    font-size: 14px

.remove
    font-size: 16px
    background: transparent
    border: 0
    font-family: $font
    cursor: pointer
    color: $color-gray-darker
</style>
