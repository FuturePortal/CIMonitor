<template>
    <div>
        <p><strong>Select font-size:</strong></p>
        <p>@Todo</p>
        <hr />
        <p><strong>Select a theme:</strong></p>
        <button
            v-for="theme in themes"
            :key="theme.slug"
            @click="setTheme(theme);"
            class="theme"
            :class="{ current: isCurrentTheme(theme) }"
        >
            {{ theme.name }}
        </button>
        <hr />
        <button @click="setTheme({ slug: 'none' });">no theme</button
        ><!-- @todo: remove -->
    </div>
</template>

<script>
import { SETTINGS_SET_THEME } from '../../../../store/StaticMutations';

export default {
    data() {
        return {
            themes: [
                {
                    name: 'Basic dark',
                    slug: 'basic-dark',
                },
                {
                    name: 'Material design',
                    slug: 'material-design',
                },
                {
                    name: 'Color stages',
                    slug: 'color-stages',
                },
            ],
        };
    },
    methods: {
        setTheme(theme) {
            this.$store.commit(SETTINGS_SET_THEME, theme.slug);
        },
        isCurrentTheme(theme) {
            return this.$store.state.settings.theme === theme.slug;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.theme
    position: relative
    display: block
    border: 0
    background: transparent
    padding: 10px 10px 10px 36px
    font-size: 16px
    cursor: pointer

    &::before
        content: ' '
        position: absolute
        left: 0
        top: 50%
        margin-top: -12px
        width: 20px
        height: 20px
        border-radius: 50%
        border: 2px solid $color-gray-lighter

.current::after
        content: ' '
        position: absolute
        left: 6px
        top: 50%
        margin-top: -6px
        width: 12px
        height: 12px
        border-radius: 50%
        background: $color-info

hr
    height: 2px
    background: $color-gray-lighter
    border: 0
    margin: 15px 0
</style>
