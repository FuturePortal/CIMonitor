<template>
    <div>
        <p>Switch theme:</p>
        <p v-for="theme in themes" :key="theme.slug" class="theme">
            <button @click="setTheme(theme.slug);">{{ theme.name }}</button>
        </p>
        <p><button @click="setTheme('none');">No theme</button></p>
    </div>
</template>

<script>
import { SETTINGS_SET_THEME } from '../../../../store/StaticMutations';

export default {
    data() {
        return {
            themes: [
                {
                    name: 'Basic light',
                    slug: 'basic-light',
                },
                {
                    name: 'Basic dark',
                    slug: 'basic-dark',
                },
            ],
        };
    },
    methods: {
        setTheme(themeSlug) {
            this.$store.commit(SETTINGS_SET_THEME, themeSlug);
        },
    },
    computed: {
        currentTheme() {
            const currentThemeSlug = this.$store.state.settings.theme;

            return this.themes.find(theme => theme.slug === currentThemeSlug);
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped></style>
