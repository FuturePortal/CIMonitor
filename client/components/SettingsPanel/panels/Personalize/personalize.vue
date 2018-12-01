<template>
    <div>
        <div v-for="theme in themes" :key="theme.slug" class="theme">
            <strong>
                {{ theme.name }} <span v-if="isCurrentTheme(theme)"><i class="far fa-check-circle"></i></span>
            </strong>
            <button class="preview" @click="setTheme(theme);" :class="getThemeClass(theme)">
                <div class="status__container info" />
                <div class="status__container success" />
                <div class="status__container warning" />
                <div class="status__container error" />
            </button>
        </div>
        <button @click="setTheme({ slug: 'none' });">no theme</button>
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
                    name: 'Basic light',
                    slug: 'basic-light',
                },
                {
                    name: 'Material design',
                    slug: 'material-design',
                },
            ],
        };
    },
    methods: {
        getThemeClass(theme) {
            return `theme__${theme.slug}`;
        },
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
    margin-bottom: 15px

    strong
        display: block
        margin-bottom: 5px

.preview
    width: 100%
    display: flex
    justify-content: space-evenly
    align-items: stretch
    border: 0
    cursor: pointer

    .status__container
        width: 18%
        height: 60px
        margin-top: 0
</style>
