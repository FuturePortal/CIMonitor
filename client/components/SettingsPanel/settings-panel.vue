<template>
    <div v-if="open" class="overlay" @click="closeOnOutsideClick">
        <div class="settings-panel">
            <div class="title-bar">
                Settings <button @click="closePanel" class="close"><i class="fas fa-times"></i></button>
            </div>
            <div class="body">
                <div class="menu">
                    <button
                        v-for="tab in tabs"
                        @click="openSettingsTab(tab);"
                        :key="tab.name"
                        :class="{ active: tab === openTab }"
                    >
                        <i :class="tab.icon"></i> <span class="title">{{ tab.name }}</span>
                    </button>
                </div>
                <div class="setting-space-wrapper">
                    <note v-if="openTab.localChangesOnly">Changes you make here will only affect you.</note>
                    <note v-if="!openTab.localChangesOnly && openTab.localChangesOnly !== null" type="warning">
                        Changes you make here will affect all connected clients.
                    </note>
                    <div class="setting-space"><component :is="openTab.component" /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { SETTINGS_PANEL_TOGGLE } from '../../store/StaticActions';
import PersonalizePanel from './panels/Personalize';
import NotifyPanel from './panels/Notify';
import StatusesPanel from './panels/Statuses';
import AboutTab from './panels/About';
import Note from './Note';

const tabs = [
    {
        icon: 'fas fa-th-list',
        name: 'Statuses',
        component: StatusesPanel,
        localChangesOnly: false,
    },
    {
        icon: 'fas fa-paint-brush',
        name: 'Personalisation',
        component: PersonalizePanel,
        localChangesOnly: true,
    },
    {
        icon: 'fas fa-bell',
        name: 'Notifications',
        component: NotifyPanel,
        localChangesOnly: true,
    },
    {
        icon: 'fas fa-info-circle',
        name: 'About',
        component: AboutTab,
        localChangesOnly: null,
    },
];

export default {
    components: { Note },
    data() {
        return {
            tabs,
            openTab: tabs[0],
        };
    },
    methods: {
        closeOnOutsideClick(event) {
            if (event.target.className === 'overlay') {
                this.$store.dispatch(SETTINGS_PANEL_TOGGLE);
            }
        },
        closePanel() {
            this.$store.dispatch(SETTINGS_PANEL_TOGGLE);
        },
        openSettingsTab(tab) {
            this.openTab = tab;
        },
    },
    computed: {
        open() {
            return this.$store.state.settings.settingsPanelOpen;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
$border-radius: 10px
$seperator-color: $color-gray-lighter

.overlay
    position: fixed
    display: flex
    align-items: center
    justify-content: center
    background: rgba(0, 0, 0, 0.8)
    padding: 0 20px
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: auto
    height: auto

.settings-panel
    maring: 0 auto
    width: 800px
    max-width: 100%
    box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.2)
    border-radius: $border-radius

.title-bar
    position: relative
    background: $color-gray-darker
    border-radius: $border-radius $border-radius 0 0
    padding: 10px 20px
    color: $color-white
    text-align: center
    font-size: 20px

.close
    position: absolute
    top: 0
    right: 0
    bottom: 0
    width: 50px
    height: auto
    color: $color-white
    background: transparent
    border: 0
    display: block
    cursor: pointer
    font-size: 20px

.body
    display: flex
    height: 600px
    max-height: 80vh

.menu
    background: #fff
    border-bottom-left-radius: $border-radius
    width: 200px
    border-right: 2px solid $seperator-color

    button
        display: block
        width: 100%
        padding: 20px
        text-align: left
        border: 0
        background: transparent
        border-bottom: 2px solid $seperator-color
        font-size: 18px
        cursor: pointer

        &.active
            background: $seperator-color

    i
        color: $color-gray-darker

    @media(max-width: 800px)
        width: 60px

        .title
            display: none

        button
            padding: 20px 0
            text-align: center

.setting-space-wrapper
    background: $color-white
    border-bottom-right-radius: $border-radius
    flex: 1
    overflow: auto

.setting-space
    padding: 20px

    /deep/ h1,
    /deep/ p
        margin-bottom: 15px
</style>
