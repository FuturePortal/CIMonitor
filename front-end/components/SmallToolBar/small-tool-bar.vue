<template>
    <div class="toolbar" :class="state">
        <div class="logo">
            <img :src="trafficLightImage" alt="logo" />
        </div>
        <button @click="openGitHub()">
            <i class="fab fa-github" />
        </button>
        <button @click="openSettings()">
            <i class="fas fa-cog" />
        </button>
    </div>
</template>

<script>
import TrafficLightGreen from './circle-green.svg';
import TrafficLightOrange from './circle-orange.svg';
import TrafficLightRed from './circle-red.svg';
import { SETTINGS_PANEL_TOGGLE } from '../../store/StaticActions';

export default {
    props: {
        state: {
            type: String,
            default: 'success',
        },
    },
    methods: {
        openGitHub() {
            window.open('https://github.com/CIMonitor/CIMonitor', '_blank');
        },
        openSettings() {
            this.$store.dispatch(SETTINGS_PANEL_TOGGLE);
        },
    },
    computed: {
        trafficLightImage() {
            return {
                success: TrafficLightGreen,
                warning: TrafficLightOrange,
                error: TrafficLightRed,
            }[this.state];
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
$light-transparancy: 0.5
$light-distance: 40px
$light-spread: 10px

.toolbar
    position: fixed
    bottom: 0
    right: -100px
    width: 140px
    background-color: $color-gray-darker
    color: $color-white
    border-radius: 16px 0 0 0
    display: flex
    flex-direction: row
    transition: right 300ms
    box-shadow: 0 0 $light-distance $light-spread rgba($color-success, $light-transparancy)

    &.warning
        box-shadow: 0 0 $light-distance $light-spread rgba($color-warning, $light-transparancy)

    &.error
        box-shadow: 0 0 $light-distance $light-spread rgba($color-error, $light-transparancy)

    &:hover
        right: 0

button
    width: 90px
    border: 0
    outline: 0
    height: 40px
    cursor: pointer
    background: transparent
    transition: background-color 200ms
    color: $color-white
    font-size: 24px
    flex-grow: 1

    &:hover
        background-color: lighten($color-gray-darker, 5%)

.logo
    height: 20px
    width: 20px
    text-align: center
    padding: 10px

    img
        width: 20px
        height: 20px
</style>
