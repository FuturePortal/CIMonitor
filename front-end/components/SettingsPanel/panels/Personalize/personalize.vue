<template>
    <div>
        <p><strong>Status size:</strong></p>
        <p>
            To increase the size of the dashboard, please use the built in zoom functionality using `ctrl +` and `ctrl
            -`.
        </p>
        <p><strong>Hide cursor:</strong></p>
        <button class="option" @click="disableCursorHide" :class="{ current: !cursorHidden }">
            Don't hide cursor
        </button>
        <button class="option" @click="enableCursorHide" :class="{ current: cursorHidden }">
            Hide cursor
        </button>
        <div id="cursorHiddenTimeout" v-if="cursorHidden">
            Hide after <input v-model.number="cursorHiddenTimeout" type="number" class="text" /> miliseconds
        </div>
    </div>
</template>

<script>
import {
    SETTINGS_SET_CURSORHIDDEN_ON,
    SETTINGS_SET_CURSORHIDDEN_OFF,
    SETTINGS_SET_CURSORHIDDEN_TIMEOUT,
} from '../../../../store/StaticMutations';

export default {
    methods: {
        enableCursorHide() {
            this.$store.commit(SETTINGS_SET_CURSORHIDDEN_ON);
        },
        disableCursorHide() {
            this.$store.commit(SETTINGS_SET_CURSORHIDDEN_OFF);
        },
    },
    computed: {
        cursorHidden() {
            return this.$store.state.settings.cursorHidden;
        },
        cursorHiddenTimeout: {
            get: function() {
                return this.$store.state.settings.cursorHiddenTimeout;
            },
            set: function(timeout) {
                this.$store.commit(SETTINGS_SET_CURSORHIDDEN_TIMEOUT, timeout);
            },
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
#cursorHiddenTimeout
    padding-left: 36px

.option
    @extend %radio-option

.text
    @extend %input-text
</style>
