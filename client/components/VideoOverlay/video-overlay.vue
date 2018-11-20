<template>
    <div class="video-container" v-html="youtubeVideoFrame"></div>
</template>

<script>
import socketEvents from '../../../shared/socketEvents';

export default {
    props: [],
    data() {
        return {
            youtubeVideoFrame: '',
        };
    },
    methods: {
        setYoutubeVideo(videoDetails) {
            const key = videoDetails.youtubeKey;
            const startAt = videoDetails.youtubeKey;
            this.youtubeVideoFrame = `
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/${key}?controls=0&amp;start=${startAt}&autoplay=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            `;
            setTimeout(() => this.clearYoutubeVideo(), videoDetails.duration * 1000);
        },
        clearYoutubeVideo() {
            this.youtubeVideoFrame = '';
        },
    },
    computed: {},
    sockets: {
        [socketEvents.playVideo](videoDetails) {
            console.log('Received video!');

            // @todo: add video queue

            this.setYoutubeVideo(videoDetails);
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.video-container
    position: fixed
    bottom: 0
    left: 0
    width: 100%
</style>
