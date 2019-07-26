<template>
    <div>
        <h1>CIMonitor version {{ version }}</h1>
        <p>
            In the past, deployments were scary. That shouldn't be the case anymore! CIMonitor helps you to achieve more
            fun setting up your tests and deployments. Find more information about the features in
            <a href="https://cimonitor.rtfd.io/" target="_blank">the documentation</a>.
        </p>
        <p>A big thank you to all the contributors of the project:</p>
        <div v-if="contributors.length === 0">
            <i class="fas fa-spinner fa-spin"></i> Loading contributors from GitHub.com
        </div>
        <div v-for="contributor in contributors" class="contributor" :key="contributor.username">
            <a :href="getGitHubLink(contributor)" target="_blank">
                <img class="image" :src="contributor.userImage" :alt="contributor.username" />
            </a>
            <div class="info">
                <div class="name">
                    {{ contributor.name }} <span class="username">@{{ contributor.username }}</span>
                </div>
                <div v-if="contributor.location" class="location">
                    {{ contributor.location }}
                </div>
                <div class="contributions">
                    <a :href="getContributionsLink(contributor)" target="_blank">
                        {{ getContributionsText(contributor) }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CONTRIBUTOR_GET_ORDERED } from '../../../../store/StaticGetters';
import { CONTRIBUTOR_FETCH_CONTRIBUTORS } from '../../../../store/StaticActions';

export default {
    created() {
        this.$store.dispatch(CONTRIBUTOR_FETCH_CONTRIBUTORS);
    },
    methods: {
        getContributionsText(contributor) {
            return `${contributor.commits} contribution${contributor.commits === 1 ? '' : 's'}`;
        },
        getContributionsLink(contributor) {
            return `https://github.com/CIMonitor/CIMonitor/commits?author=${contributor.username}`;
        },
        getGitHubLink(contributor) {
            return `https://github.com/${contributor.username}`;
        },
    },
    computed: {
        contributors() {
            return this.$store.getters[CONTRIBUTOR_GET_ORDERED];
        },
        version() {
            return window.CIMonitorVersion;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.contributor
    padding: 10px 0
    border-top: 2px solid $color-gray-lighter
    display: flex

.info
    margin-top: 2px

.location,
.username
    color: $color-gray

.image
    height: 67px
    width: 67px
    border-radius: 50%
    background: rgba(0, 0, 0, 0.1)
    margin-right: 15px

.location,
.contributions
    margin-top: 5px
</style>
