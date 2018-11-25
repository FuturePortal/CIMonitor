<template>
    <div>
        <div class="remove-all" v-if="statuses.length > 0">
            <button class="remove" @click="removeAll"><i class="fas fa-ban" /> remove all</button>
        </div>
        <h1>Statuses</h1>
        <p v-if="statuses.length === 0">
            There are no statuses yet in CIMonitor.<br />
            Learn how to push statuses in
            <a target="_blank" href="https://cimonitor.readthedocs.io/">the documentation</a>.
        </p>
        <div class="row" v-for="status in statuses" :key="status.key">
            <div class="status" :class="status.state">
                <div class="title">
                    {{ status.title }}
                    <div v-if="status.subTitle" class="sub-title">{{ status.subTitle }}</div>
                </div>
                <div class="actions">
                    <button class="remove" @click="remove(status.key);"><i class="fas fa-ban" /> remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        remove(statusKey) {
            const xhttp = new XMLHttpRequest();
            xhttp.open('DELETE', `/status/${statusKey}`, true);
            xhttp.send();
        },
        removeAll() {
            const xhttp = new XMLHttpRequest();
            xhttp.open('GET', '/status/clear-all', true);
            xhttp.send();
        },
    },
    computed: {
        statuses() {
            return this.$store.state.statuses.statuses;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.remove-all
    float: right

.row
    border-top: 2px solid $gray-lighter
    padding-bottom: 10px

.status
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
    color: #333
</style>
