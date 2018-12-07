<template>
    <div class="no-connection">no connection with the server</div>
</template>

<script>
export default {};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.no-connection
    position: fixed
    top: 0
    left: 0
    width: calc(100% - 40px)
    padding: 20px
    color: $color-white
    font-size: 50px
    text-align: center
    background: rgba(235, 0, 0, 0.8)
</style>
