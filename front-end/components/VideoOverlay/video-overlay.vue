<template>
    <div v-if="playing" class="video-container" v-html="youtubeVideoFrame" />
</template>

<script>
import socketEvents from '../../../shared/socketEvents';

export default {
    props: {},
    data() {
        return {
            youtubeVideoFrame: '',
            playing: false,
            videoQueue: [],
        };
    },
    methods: {
        playNextVideoInLine() {
            console.log(`[VideoOverlay] ${this.videoQueue.length} videos in line to play...`);

            const videoDetails = this.videoQueue.shift();
            const key = videoDetails.youtubeKey;
            const startAt = videoDetails.startAt;
            this.youtubeVideoFrame = `
                <iframe
                    src="https://www.youtube.com/embed/${key}?controls=0&start=${startAt}&autoplay=1&iv_load_policy=3"
                    frameborder="0"
                    class="video-frame"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            `;
            setTimeout(() => this.playNext(), videoDetails.duration * 1000);
        },
        clearYoutubeVideo() {
            this.youtubeVideoFrame = '';
        },
        addVideoToQueue(videoDetails) {
            this.videoQueue.push(videoDetails);
        },
        playNext() {
            if (this.videoQueue.length > 0) {
                this.playNextVideoInLine();
                return;
            }

            this.playing = false;
            this.clearYoutubeVideo();
        },
        play() {
            if (this.playing) {
                return;
            }

            this.playing = true;
            this.playNextVideoInLine();
        },
    },
    computed: {},
    sockets: {
        [socketEvents.playVideo](videoDetails) {
            this.addVideoToQueue(videoDetails);

            this.play();
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
    overflow: hidden
    padding-bottom: 56.25%
    height: 0

    ::v-deep iframe
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        border: 0
</style>
