<template>
    <div class="note" :class="type"><i :class="icon"></i> <slot /></div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'info',
        },
    },
    computed: {
        icon() {
            if (this.type === 'warning') {
                return 'fas fa-exclamation-triangle';
            }

            return 'fas fa-info-circle';
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.note
    padding: 20px
    background: $color-info
    color: #333333
    font-size: 18px

    &.warning
        background: $color-warning
</style>
