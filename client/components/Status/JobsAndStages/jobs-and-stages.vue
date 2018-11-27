<template>
    <div>
        <div class="stages" v-if="stages.length > 0">
            <div class="stage" :class="getStageStatus(stage)" v-for="(stage, index) in stages" :key="index">
                <i :class="stateToIcon(getStageStatus(stage))" /> {{ stage }}
            </div>
        </div>
        <div class="jobs" v-if="interestingJobs.length > 0">
            <div class="job" v-for="(job, index) in interestingJobs" :key="index">
                <i :class="stateToIcon(job.state)" /> {{ job.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
        stateToIcon(state) {
            return {
                error: 'fas fa-times',
                running: 'fas fa-redo-alt fa-spin',
                pending: 'fas fa-map-marker-alt',
                success: 'fas fa-check',
                warning: 'fas fa-exclamation-triangle',
                info: 'fas fa-info-circle',
            }[state];
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
    },
    computed: {
        interestingJobs() {
            if (!this.jobs) {
                return [];
            }

            return this.jobs.filter(job => ['running', 'error', 'warning'].indexOf(job.state) !== -1);
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.jobs,
.stages
    margin-top: 10px
    font-size: 26px

.job,
.stage
    display: inline-block
    margin: 0 20px 10px 0
    border-radius: 5px

    &.pending
        opacity: 0.5
</style>
