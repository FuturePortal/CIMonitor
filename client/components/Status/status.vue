<template>
    <div class="status" :class="status.state">
        <img v-if="status.image" :src="status.image" class="image" />
        <div class="details">
            <div class="title">{{ status.title }}</div>
            <div class="jobs" v-if="status.jobs && interestingJobs">
                <div class="job" v-for="(job, index) in interestingJobs" :key="index">
                    <i :class="stateToIcon(job.state)"></i>
                    {{ job.name }}
                </div>
            </div>
            <div class="sub-title">
                <span v-if="status.subTitle">{{ status.subTitle }}</span>
                <span class="time-ago" v-if="now">
                    <i class="far fa-clock"></i> {{ timeAgo }}
                </span>
            </div>
        </div>
        <img v-if="status.userImage" :src="status.userImage" class="user-image" />
        <button class="remove-button" @click="remove(status.key)"><i class="fas fa-ban"></i></button>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props: ['status', 'now'],
    methods: {
        remove(statusKey) {
            const xhttp = new XMLHttpRequest();
            xhttp.open('DELETE', `/status/${statusKey}`, true);
            xhttp.send();
        },
        stateToIcon(state) {
            return {
                error: 'fas fa-times',
                running: 'fas fa-redo-alt fa-spin',
                pending: 'far fa-pause-circle',
                'allowed-error': 'fas fa-exclamation-triangle',
            }[state];
        },
    },
    computed: {
        timeAgo() {
            var timeAgo = moment(this.status.time).from(this.now);
            if (timeAgo === 'a few seconds ago' || timeAgo === 'in a few seconds') {
                return 'just now';
            }
            return timeAgo;
        },
        interestingJobs() {
            if (!this.status.jobs) {
                return [];
            }

            return this.status.jobs.filter(
                job => ['pending', 'running', 'error', 'allowed-error'].indexOf(job.state) !== -1,
            );
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
$border-top: 2px
$border-bottom: 3px

.status
    position: relative
    color: #fff
    background: $color-info
    border-top: $border-top solid $color-info-light
    border-bottom: $border-bottom solid $color-info-dark
    margin-bottom: 10px
    padding: 20px 0
    overflow: hidden
    display: flex
    flex-direction: row

    &:last-child
        margin-bottom: 0

.details
    min-height: 100px
    flex-grow: 1
    margin: 0 20px

.title
    font-size: 50px

.sub-title
    font-size: 30px

.user-image,
.image
    height: 100px

.image
    border-radius: 3px
    margin-left: 20px

.user-image
    border-radius: 50%
    background-color: rgba(0, 0, 0, 0.1)
    margin-right: 20px

.remove-button
    position: absolute
    top: $border-top
    right: $border-top
    background: transparent
    border: 0
    font-size: 20px
    padding: 5px
    cursor: pointer
    color: rgba(0, 0, 0, 0.1)
    transition: color 200ms

    &:hover
        color: #fff

.time-ago
    padding-left: 10px
    font-size: 20px

.jobs
    margin-top: 10px

.job
    display: inline-block
    font-size: 26px
    margin: 0 20px 10px 0
    border-radius: 5px

.success
    background: $color-success
    border-top: $border-top solid $color-success-light
    border-bottom: $border-bottom solid $color-success-dark

.warning
    background: $color-warning
    border-top: $border-top solid $color-warning-light
    border-bottom: $border-bottom solid $color-warning-dark

.error
    background: $color-error
    border-top: $border-top solid $color-error-light
    border-bottom: $border-bottom solid $color-error-dark
</style>
