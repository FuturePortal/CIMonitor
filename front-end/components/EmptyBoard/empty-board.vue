<template>
    <div class="empty-board">
        <div class="circle">
            <img src="./logo.png" alt="logo" /> CIMonitor {{ version }} <span>no statuses to show</span>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        version() {
            return window.CIMonitorVersion;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.empty-board
    width: 100%
    height: 100vh
    display: flex
    align-items: center
    justify-content: center

.circle
    width: 300px
    height: 240px
    background: $color-white
    border-radius: 50%
    text-align: center
    box-shadow: 0 0 100px 70px rgba($color-success, 0.3)
    padding-top: 60px
    font-size: 26px
    flex-shrink: 0

    img
        display: block
        height: 120px
        margin: auto

    span
        display: block
        font-size: 16
        color: $color-gray-dark
</style>
