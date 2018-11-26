<template>
    <div>
        <h1>CIMonitor version 2</h1>
        <p>
            In the past, deployments were scary. That shouldn't be the case anymore! CIMonitor helps you to achieve more
            fun setting up your tests and deployments. Find more information about the features in
            <a href="https://cimonitor.rtfd.io/" target="_blank">the documentation</a>.
        </p>
        <p>A big thank you to all the contributors of the project:</p>
        <div v-for="contributor in contributors" class="contributor" :key="contributor.username">
            <a :href="getGitHubLink(contributor)" target="_blank">
                <img class="image" :src="contributor.userImage" :alt="contributor.username" />
            </a>
            <div class="info">
                <div class="name">@{{ contributor.username }}</div>
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
export default {
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
            // @todo: Load from store
            return JSON.parse(
                '[{"commits":76,"username":"RickvdStaaij","githubProfile":"https://github.com/RickvdStaaij","userImage":"https://avatars0.githubusercontent.com/u/6495166?v=4"},{"commits":9,"username":"eXistenZNL","githubProfile":"https://github.com/eXistenZNL","userImage":"https://avatars3.githubusercontent.com/u/1150201?v=4"},{"commits":2,"username":"syphernl","githubProfile":"https://github.com/syphernl","userImage":"https://avatars1.githubusercontent.com/u/639906?v=4"},{"commits":1,"username":"steefmin","githubProfile":"https://github.com/steefmin","userImage":"https://avatars1.githubusercontent.com/u/5700620?v=4"}]'
            );
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

.image
    height: 50px
    width: 50px
    border-radius: 50%
    background: rgba(0, 0, 0, 0.1)
    margin-right: 15px

.contributions
    margin-top: 5px
</style>
