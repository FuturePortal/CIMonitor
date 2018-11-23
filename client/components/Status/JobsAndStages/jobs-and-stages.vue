<template>
    <div>
        <div class="stages">
            <div class="stage" v-for="(stage, index) in stages" :key="index">
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
                error: 'far fa-times-circle',
                running: 'fas fa-spinner fa-spin',
                pending: 'far fa-circle',
                success: 'far fa-check-circle',
                warning: 'fas fa-exclamation-circle',
                info: 'fas fa-info-circle',
            }[state];
        },
        getStageStatus(stage) {
            const relevantJobs = this.jobs.filter(job => job.stage && job.stage === stage);

            if (relevantJobs.find(job => job.state === 'running')) {
                return 'running';
            }

            if (relevantJobs.find(job => job.state === 'error')) {
                return 'error';
            }

            if (relevantJobs.find(job => job.state === 'warning')) {
                return 'warning';
            }

            if (relevantJobs.find(job => job.state === 'success')) {
                return 'success';
            }

            return 'info';
        },
    },
    computed: {
        interestingJobs() {
            if (!this.jobs) {
                return [];
            }

            return this.jobs.filter(job => ['pending', 'running', 'error', 'warning'].indexOf(job.state) !== -1);
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.jobs,
.stages
    margin-top: 10px

.job,
.stage
    display: inline-block
    font-size: 26px
    margin: 0 20px 10px 0
    border-radius: 5px
</style>
