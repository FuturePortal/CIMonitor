<template>
    <div class="detail-jobs-and-stages" @mouseleave="clearSelectedStage">
        <div class="detail-stages" v-if="stages.length > 0">
            <div
                class="detail-stage"
                :class="getStageClasses(stage)"
                v-for="stage in stages"
                :key="stage"
                @mouseenter="selectStage(stage);"
            >
                {{ stage }}
            </div>
        </div>
        <div class="detail-jobs" v-if="interestingJobs.length > 0">
            <div class="detail-job" v-for="job in interestingJobs" :class="getJobClasses(job)" :key="job.name">
                {{ job.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedStage: null,
        };
    },
    props: {
        jobs: {
            type: Array,
            default: () => [],
        },
        stages: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        getStageClasses(stage) {
            return this.selectedStage === stage ? `selected ${this.getStageStatus(stage)}` : this.getStageStatus(stage);
        },
        getJobClasses(job) {
            return this.selectedStage ? `selected ${job.state}` : job.state;
        },
        getStageStatus(stage) {
            const jobsForStage = this.jobs.filter(job => job.stage && job.stage === stage);

            if (jobsForStage.find(job => job.state === 'running')) {
                return 'running';
            }

            if (jobsForStage.find(job => job.state === 'error')) {
                return 'error';
            }

            if (jobsForStage.find(job => job.state === 'warning')) {
                return 'warning';
            }

            if (jobsForStage.find(job => job.state === 'success')) {
                return 'success';
            }

            return 'pending';
        },
        clearSelectedStage() {
            this.selectedStage = null;
        },
        selectStage(stage) {
            this.selectedStage = stage;
        },
    },
    computed: {
        interestingJobs() {
            if (!this.jobs) {
                return [];
            }

            if (this.selectedStage) {
                return this.jobs.filter(job => job.stage === this.selectedStage);
            }

            return this.jobs.filter(job => ['running', 'error', 'warning'].indexOf(job.state) !== -1);
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.detail-stages
    display: flex
    width: 100%

.detail-jobs
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
    grid-gap: 5px
    margin: 5px

.detail-job
    border-radius: 5px
    max-width: 100%
    white-space: nowrap

.detail-stage,
.detail-job
    font-size: 26px
    padding: 5px 10px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

    @media (max-width: $responsive-breakpoint)
        padding: 5px
        font-size: 18px

    &::before
        font-family: "Font Awesome 5 Free"
        font-weight: 900

    &.pending
        opacity: 0.7

        &::before
            content: "\f3c5"

    &.error
        background: $color-error-darker

        &::before
            content: "\f00d"

    &.running
        background: $color-warning-darker

        &::before
            animation: fa-spin 2s infinite linear
            display: inline-block
            content: "\f2f9"

    &.success
        background: $color-success-darker

        &::before
            content: "\f00c"

    &.warning
        background: $color-warning-darker

        &::before
            content: "\f071"

    &.info
        background: $color-info-darker

        &::before
            content: "\f05a"

.detail-stage
    flex: 1
    margin: 5px 0
    min-width: 0
    flex-shrink: 1

    &:first-child
        margin-left: 5px
        border-top-left-radius: 5px
        border-bottom-left-radius: 5px

    &:last-child
        margin-right: 5px
        border-top-right-radius: 5px
        border-bottom-right-radius: 5px

    &.selected
        background: $color-gray-darker
        color: $color-gray-lighter
</style>
