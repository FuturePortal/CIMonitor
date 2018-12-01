<template>
    <div class="status__container" :class="status.state">
        <div class="image-resolver"><img v-if="status.image" :src="status.image" @error="hideImage" /></div>
        <div
            class="status__image-container"
            :class="{ 'status__image-container--no-image': !showImage || !status.image }"
        >
            <div
                class="status__image"
                :class="{ 'status__image--no-image': !showImage || !status.image }"
                :style="imageStyle"
            />
        </div>
        <div class="status__detail-container">
            <div class="status__detail-title">{{ status.title }}</div>
            <jobs-and-stages :jobs="status.jobs" :stages="status.stages" />
            <div class="status__detail-sub-title" v-if="status.subTitle">{{ status.subTitle }}</div>
        </div>
        <div
            class="status__user-image-container"
            :class="{ 'status__user-image-container--no-image': !status.userImage }"
        >
            <div
                class="status__user-image"
                :class="{ 'status__user-image--no-image': !status.userImage }"
                :style="userImageStyle"
            />
        </div>
        <div class="status__time-ago" v-if="now" :class="{ 'status__time-ago--no-user-image': !status.userImage }">
            {{ timeAgo }}
        </div>
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
        imageStyle() {
            if (!this.status.image || !this.showImage) {
                return {};
            }

            return {
                backgroundImage: `url(${this.status.image})`,
            };
        },
        userImageStyle() {
            if (!this.status.userImage) {
                return {};
            }

            return {
                backgroundImage: `url(${this.status.userImage})`,
            };
        },
        timeAgo() {
            if (!this.now) {
                return 'never';
            }

            let timeAgo = moment(this.status.time).from(this.now);
            if (timeAgo === 'a few seconds ago' || timeAgo === 'in a few seconds') {
                return 'just now';
            }
            return timeAgo.replace('minutes', 'min');
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
$border-top: 2px
$border-bottom: 3px

.status__container
    position: relative
    color: $color-white
    background: $color-info
    overflow: hidden
    display: flex
    align-items: stretch

    &.success
        background: $color-success

    &.warning
        background: $color-warning

    &.error
        background: $color-error

.status__detail-container
    flex-grow: 1

.status__detail-title
    font-size: 50px

.status__detail-sub-title
    font-size: 30px

.status__image-container,
.status__user-image-container
    flex-shrink: 0

.status__time-ago
    font-size: 24px

.image-resolver
    visibility: 0
    height: 0
    width: 0
    overflow: hidden
</style>
