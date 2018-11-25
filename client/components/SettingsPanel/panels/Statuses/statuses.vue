<template>
    <div>
        Statuses
        <button class="remove-button" @click="remove('test');"><i class="fas fa-ban" /></button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        remove(statusKey) {
            const xhttp = new XMLHttpRequest();
            xhttp.open('DELETE', `/status/${statusKey}`, true);
            xhttp.send();
        },
    },
    computed: {},
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped></style>
