<template>
    <div class="status" :class="status.state">
        <img v-if="status.image && this.showImage" :src="status.image" class="status__image" @error="hideImage" />
        <div class="status__details">
            <div class="status__title">{{ status.title }}</div>
            <jobs-and-stages :jobs="status.jobs" :stages="status.stages" />
            <div>
                <span class="status__sub-title" v-if="status.subTitle">{{ status.subTitle }}</span>
                <span class="status__time-ago" v-if="now"> <i class="fas fa-history" /> {{ timeAgo }} </span>
            </div>
        </div>
        <img v-if="status.userImage" :src="status.userImage" class="status__user-image" />
    </div>
</template>

<script>
import moment from 'moment';
import JobsAndStages from './JobsAndStages';

export default {
    props: {
        status: {
            type: Object,
            default: null,
        },
        now: {
            type: Number,
            default: null,
        },
    },
    data: function() {
        return {
            showImage: true,
        };
    },
    components: { JobsAndStages },
    methods: {
        hideImage() {
            this.showImage = false;
        },
    },
    computed: {
        timeAgo() {
            if (!this.now) {
                return 'never';
            }

            var timeAgo = moment(this.status.time).from(this.now);
            if (timeAgo === 'a few seconds ago' || timeAgo === 'in a few seconds') {
                return 'just now';
            }
            return timeAgo;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
$border-top: 2px
$border-bottom: 3px

.status
    position: relative
    color: $color-white
    background: $color-info
    margin-top: 10px
    padding: 20px 0
    overflow: hidden
    display: flex
    flex-direction: row

    &:first-child
        margin-top: 0

    &.success
        background: $color-success

    &.warning
        background: $color-warning

    &.error
        background: $color-error

.status__details
    min-height: 100px
    flex-grow: 1
    margin: 0 20px

.status__title
    font-size: 50px

.status__sub-title
    font-size: 30px
    padding-right: 10px

.status__user-image,
.status__image
    height: 100px

.status__image
    border-radius: 3px
    margin-left: 20px

.status__user-image
    border-radius: 50%
    background-color: rgba(0, 0, 0, 0.1)
    margin-right: 20px

.status__time-ago
    font-size: 24px
</style>
