<template>
    <div>
        video overlay
    </div>
</template>

<script>
import socketEvents from '../../../shared/socketEvents';

export default {
    props: [],
    methods: {},
    computed: {},
    sockets: {
        [socketEvents.playVideo](videoDetails) {
            console.log('Video is pushed!!!');
            console.log(videoDetails);
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
</style>
