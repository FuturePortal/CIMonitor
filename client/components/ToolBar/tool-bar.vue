<template>
    <div>
        <div class="light" :class="state"></div>
        <div class="toolbar">
            <button @click="openGitHub()">
                <i class="fab fa-github"></i>
            </button>
            <div class="logo">
                <img :src="trafficLightImage" alt="logo" />
            </div>
            <button @click="clearDashboard()" title="Clear dashboard">
                <i class="fas fa-ban"></i>
            </button>
        </div>
    </div>
</template>

<script>
import TrafficLightGreen from './traffic-light-green.svg';
import TrafficLightOrange from './traffic-light-orange.svg';
import TrafficLightRed from './traffic-light-red.svg';

export default {
    props: ['state'],
    methods: {
        openGitHub() {
            window.open('https://github.com/CIMonitor/CIMonitor', '_blank');
        },
        clearDashboard() {
            const xhttp = new XMLHttpRequest();
            xhttp.open('GET', '/status/clear-all', true);
            xhttp.send();
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
.toolbar
    position: fixed
    bottom: 0
    left: 50%
    width: 260px
    height: 50px
    margin-left: -130px
    background-color: #666
    color: #FFF
    border-radius: 20px 20px 0 0
    box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.2)

button
    width: 90px
    border: 0
    outline: 0
    height: 50px
    cursor: pointer
    background: transparent
    transition: background-color 200ms
    color: #FFF
    font-size: 24px

    &:hover
        background-color: #444

    &:first-child
        margin-right: 76px
        border-top-left-radius: 20px

    &:last-child
        border-top-right-radius: 20px

.logo
    position: absolute
    bottom: 0
    left: 50%
    width: 80px
    height: 65px
    margin-left: -40px
    background: #FFF
    text-align: center
    border-radius: 20px 20px 0 0
    padding-top: 15px
    box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.3)

    img
        height: 50px

    &:before
        width: 20px
        height: 20px
        background: transparent
        bottom: 0
        left: -20px
        position: absolute
        content: ''
        border-bottom-right-radius: 100%
        box-shadow: 0px 0px 0px 50px #FFF
        clip: rect(0px, 20px, 20px, 0px)
        display: block

    &:after
        width: 20px
        height: 20px
        background: transparent
        bottom: 0
        right: -20px
        position: absolute
        content: ''
        border-bottom-left-radius: 100%
        box-shadow: 0px 0px 0px 50px #FFF
        clip: rect(0px, 20px, 20px, 0px)
        display: block

$light-transparancy: 0.5
$light-distance: 150px
$light-spread: 120px

.light
    position: fixed
    bottom: 0
    left: 50%
    margin: 0 0 -10px -50px
    width: 100px
    height: 20px
    border-radius: 50%
    background: rgba($color-success, $light-transparancy)
    box-shadow: 0 0 $light-distance $light-spread rgba($color-success, $light-transparancy)

    &.warning
        background: rgba($color-warning, $light-transparancy)
        box-shadow: 0 0 $light-distance $light-spread rgba($color-warning, $light-transparancy)

    &.error
        background: rgba($color-error, $light-transparancy)
        box-shadow: 0 0 $light-distance $light-spread rgba($color-error, $light-transparancy)
</style>
