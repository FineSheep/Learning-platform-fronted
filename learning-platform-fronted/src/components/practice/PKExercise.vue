<template>

</template>

<script>
    export default {
        name: "PKExercise",
        data() {
            return {}
        },
        mounted() {
            this.getInfo()
        },
        methods: {
            getInfo() {
                let user = this.$route.query.user;
                let opponent = this.$route.query.opponent;
                console.log(user, opponent)
            }
        }
    }
</script>

<style scoped>

</style>