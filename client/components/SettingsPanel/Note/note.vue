<template>
    <div class="note" :class="type"><slot /></div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'info',
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.note
    padding: 20px
    background: $color-info
    color: #fff

    &.warning
        background: $color-warning
</style>
