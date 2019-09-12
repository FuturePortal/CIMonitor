<template>
    <div>
        <slot v-if="hasValidPassword" />
        <div v-else>
            <p>Sorry, you need to input a password first. Which is not possible at this time.</p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        hasValidPassword() {
            return this.$store.state.settings.password !== null;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped></style>
