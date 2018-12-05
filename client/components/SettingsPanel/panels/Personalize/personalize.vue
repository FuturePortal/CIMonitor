<template>
    <div>
        <p><strong>Status size:</strong></p>
        <p>
            To increase the size of the dashboard, please use the built in zoom functionality using `ctrl +` and `ctrl
            -`.
        </p>
        <hr />
        <p><strong>Select a theme:</strong></p>
        <button
            v-for="theme in themes"
            :key="theme.slug"
            @click="setTheme(theme);"
            class="option"
            :class="{ current: isCurrentTheme(theme) }"
        >
            {{ theme.name }}
        </button>
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
.option
    @extend %radio-option

hr
    @extend %line-break
</style>
