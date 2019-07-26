<template>
    <div class="status" :class="status.state">
        <div class="image-resolver">
            <img v-if="status.image" :src="status.image" @error="hideImage" />
        </div>
        <div class="image-container" :class="{ 'image-container--no-image': !showImage || !status.image }">
            <div class="image" :style="imageStyle" />
        </div>
        <div class="build-details">
            <div class="detail-title">
                {{ status.title }}
            </div>
            <div class="detail-sub-title" v-if="status.subTitle">
                {{ status.subTitle }}
            </div>
            <jobs-and-stages :jobs="status.jobs" :stages="status.stages" />
        </div>
        <div class="submit-details">
            <div class="user-image-container" :class="{ 'user-image--no-image': !status.userImage }">
                <div class="user-image" :style="userImageStyle" />
            </div>
            <div class="time-ago" v-if="now">
                {{ timeAgo }}
            </div>
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
.status
    position: relative
    overflow: hidden
    display: flex
    align-items: stretch
    margin-top: 10px
    color: #333

    @media (max-width: $responsive-breakpoint)
        flex-wrap: wrap

    &:first-child
        margin-top: 0

    &.info
        background: $color-info

        ::v-deep .detail-stage.pending
            background: rgba($color-info-darker, .5)

    &.success
        background: $color-success

        ::v-deep .detail-stage.pending
            background: rgba($color-success-darker, .5)

    &.warning
        background: $color-warning

        ::v-deep .detail-stage.pending
            background: rgba($color-warning-darker, .5)

    &.error
        background: $color-error

        ::v-deep .detail-stage.pending
            background: rgba($color-error-darker, .5)

.image-container
    padding: 15px
    flex-shrink: 0

    @media (max-width: $responsive-breakpoint)
        order: 2
        padding: 5px

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

    @media (max-width: $responsive-breakpoint)
        width: 40px
        height: 40px

.build-details
    min-width: 0
    flex-grow: 1

    @media (max-width: $responsive-breakpoint)
        width: 100%
        order: 1

.detail-title
    font-size: 50px
    padding: 10px 15px 5px
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap

    @media (max-width: $responsive-breakpoint)
        font-size: 32px
        padding: 10px 5px 5px

.detail-sub-title
    font-size: 30px
    padding: 0 15px 10px

    @media (max-width: $responsive-breakpoint)
        font-size: 26px
        padding: 0 5px 5px

.image-container,
.submit-details
    flex-shrink: 0

.image-resolver
    visibility: 0
    height: 0
    width: 0
    overflow: hidden

.submit-details
    padding: 10px
    flex-shrink: 0
    display: flex
    flex-direction: column

    @media (max-width: $responsive-breakpoint)
        flex-direction: row
        align-items: center
        order: 3
        padding: 5px

.user-image-container
    flex-grow: 1
    margin: 0 20px

    @media (max-width: $responsive-breakpoint)
        flex-grow: 0
        margin: 0

.user-image
    height: 100px
    width: 100px
    background:
        position: center
        size: cover
        repeat: no-repeat
    border-radius: 50%
    margin-bottom: 10px

    @media (max-width: $responsive-breakpoint)
        width: 40px
        height: 40px
        margin-bottom: 0
        margin-right: 10px

.user-image--no-image
    display: none

.time-ago
    font-size: 24px
    text-align: center

    @media (max-width: $responsive-breakpoint)
        flex-grow: 1
</style>
