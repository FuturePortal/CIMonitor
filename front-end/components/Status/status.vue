<template>
    <div class="status" :class="status.state">
        <div class="image-resolver"><img v-if="status.image" :src="status.image" @error="hideImage" /></div>
        <div class="image-container" :class="{ 'image-container--no-image': !showImage || !status.image }">
            <div class="image" :style="imageStyle" />
        </div>
        <div class="detail-container">
            <div class="detail-title">{{ status.title }}</div>
            <div class="detail-sub-title" v-if="status.subTitle">{{ status.subTitle }}</div>
            <jobs-and-stages :jobs="status.jobs" :stages="status.stages" />
        </div>
        <div class="user-image-container">
            <div class="user-image" :class="{ 'user-image--no-image': !status.userImage }" :style="userImageStyle" />
        </div>
        <div class="time-ago" v-if="now">{{ timeAgo }}</div>
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
.status
    position: relative
    overflow: hidden
    display: flex
    align-items: stretch
    margin-top: 10px
    color: #333

    &:first-child
        margin-top: 0

    &.info
        background: $color-info

        /deep/ .detail-stage.pending
            background: rgba($color-info-darker, .5)

    &.success
        background: $color-success

        /deep/ .detail-stage.pending
            background: rgba($color-success-darker, .5)

    &.warning
        background: $color-warning

        /deep/ .detail-stage.pending
            background: rgba($color-warning-darker, .5)

    &.error
        background: $color-error

        /deep/ .detail-stage.pending
            background: rgba($color-error-darker, .5)

.image-container
    padding: 20px
    flex-shrink: 0

.image-container--no-image
    display: none

.image
    width: 100px
    height: 100px
    background:
        position: center
        size: contain
        repeat: no-repeat
    border-radius: 3px

.detail-container
    min-width: 0
    flex-grow: 1

.detail-title
    font-size: 50px
    padding: 10px 15px 5px

.detail-sub-title
    font-size: 30px
    padding: 0 15px 10px

.image-container,
.user-image-container
    flex-shrink: 0

.time-ago
    font-size: 24px
    position: absolute
    right: 0
    bottom: 5px
    text-align: center
    width: 160px

.image-resolver
    visibility: 0
    height: 0
    width: 0
    overflow: hidden

.user-image-container
    padding: 10px 30px 35px
    width: 100px
    flex-shrink: 0

.user-image
    width: 100px
    height: 100px
    background:
        position: center
        size: cover
        repeat: no-repeat
    border-radius: 50%

.user-image--no-image
    display: none
</style>
