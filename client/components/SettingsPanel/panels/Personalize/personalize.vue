<template>
    <div>
        <div v-for="theme in themes" :key="theme.slug" class="theme">
            <strong>
                {{ theme.name }}
                <span v-if="isCurrentTheme(theme)">
                    <i class="far fa-check-circle"></i>
                </span>
            </strong>
            <button class="preview" @click="setTheme(theme);" :class="getThemeClass(theme)">
                <div class="status" />
                <div class="status success" />
                <div class="status warning" />
                <div class="status error" />
            </button>
        </div>
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

    .status
        width: 18%
        height: 60px
</style>
