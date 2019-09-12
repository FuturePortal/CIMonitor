<template>
    <div>
        <slot v-if="hasValidPassword" />
        <div v-else>
            <p>Sorry, this part is password protected.</p>
            <p>
                <strong>Password:</strong><br />
                <input v-model="password" type="password" class="text" />
                <button @click="unlock">unlock</button>
            </p>
        </div>
    </div>
</template>

<script>
import { SETTINGS_CHECK_AND_SET_PASSWORD } from '../store/StaticActions';

export default {
    data() {
        return {
            password: '',
        };
    },
    methods: {
        unlock() {
            this.$store.dispatch(SETTINGS_CHECK_AND_SET_PASSWORD, this.password);
        },
    },
    computed: {
        hasValidPassword() {
            return this.$store.state.settings.password !== null;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.text
    @extend %input-text

button
    @extend %input-button
</style>
