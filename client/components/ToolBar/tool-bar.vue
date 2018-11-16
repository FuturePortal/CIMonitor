<template>
    <div class="toolbar">
        <button @click="openGitHub()">
            <i class="fab fa-github"></i>
        </button>
        <div class="logo">
            <img src="./traffic-light.svg" alt="logo" />
        </div>
        <button @click="clearDashboard()" title="Clear dashboard">
            <i class="fas fa-ban"></i>
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        openGitHub() {
            window.open('https://github.com/cimonitor/gitlab-cimonitor', '_blank');
        },
        clearDashboard() {
            const xhttp = new XMLHttpRequest();
            xhttp.open('GET', '/status/clear-all', true);
            xhttp.send();
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
</style>
