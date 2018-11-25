<template>
    <div v-if="open" class="overlay" @click="closeOnOutsideClick">
        <div class="settings-panel">
            <div class="title-bar">
                Settings
            </div>
            <div class="body">
                <div class="menu">
                    <button v-for="tab in tabs" @click="openSettingsTab(tab)" :key="tab.name" :class="{active: tab === openTab}">
                        <i :class="tab.icon"></i> <span class="title">{{ tab.name }}</span>
                    </button>
                </div>
                <div class="setting-space">
                    setting tweak pace!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const tabs = [
    {
        icon: 'fas fa-th-list',
        name: 'Statuses',
        component: null,
    },
    {
        icon: 'fas fa-paint-brush',
        name: 'Personalisation',
        component: null,
    },
];

export default {
    data() {
        return {
            open: true,
            tabs,
            openTab: tabs[0],
        };
    },
    methods: {
        closeOnOutsideClick(event) {
            if (event.target.className === 'overlay') {
                this.open = false;
            }
        },
        openSettingsTab(tab) {
            this.openTab = tab;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
$border-radius: 10px;
$seperator-color: #F0F0F0;

.overlay
    position: fixed
    display: flex
    align-items: center
    justify-content: center
    background: rgba(0, 0, 0, 0.1)
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

.title-bar
    background: $gray-dark
    border-radius: $border-radius $border-radius 0 0
    padding: 10px 20px
    color: #fff
    text-align: center
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
        color: #303030

    @media(max-width: 800px)
        width: 60px

        .title
            display: none

        button
            padding: 20px 0
            text-align: center

.setting-space
    background: #fff
    border-bottom-right-radius: $border-radius
    flex: 1
    padding: 20px

</style>
