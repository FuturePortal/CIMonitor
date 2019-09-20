<template>
    <div>
        <p v-if="!checkedForPasswordRequirement">Checking if a password is required...</p>
        <slot v-else-if="!passwordRequired || hasValidPassword" />
        <div v-else>
            <p>Sorry, this part is password protected.</p>
            <p>
                <strong>Password:</strong><br />
                <input v-model="password" type="password" class="text" />
                <button @click="unlock">unlock</button>
            </p>
            <div v-if="error" class="error-message">{{ error }}</div>
        </div>
    </div>
</template>

<script>
import { SETTINGS_CHECK_AND_SET_PASSWORD, SETTINGS_CHECK_PASSWORD_REQUIREMENT } from '../store/StaticActions';

export default {
    data() {
        return {
            password: '',
            error: null,
        };
    },
    created() {
        this.$store.dispatch(SETTINGS_CHECK_PASSWORD_REQUIREMENT);
    },
    methods: {
        unlock() {
            this.$store.dispatch(SETTINGS_CHECK_AND_SET_PASSWORD, this.password).catch(error => {
                this.error = error.message;

                setTimeout(() => {
                    this.error = '';
                }, 5000);
            });
        },
    },
    computed: {
        hasValidPassword() {
            return this.passwordRequired && this.$store.state.settings.password !== null;
        },
        passwordRequired() {
            return this.$store.state.settings.passwordRequired;
        },
        checkedForPasswordRequirement() {
            return this.$store.state.settings.passwordRequired !== null;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.text
    @extend %input-text

.error-message
    padding: 10px
    color: $color-white
    background: $color-error
    border-radius: 6px

button
    @extend %input-button
</style>
