<template>
    <div>index</div>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "QuestionIndex",
        data() {
            return {}
        },
        async created() {
            let ques = {
                userId: this.$route.params.userId,
                difficulty: this.$route.params.difficulty,
                source: this.$route.params.source,
                sum: this.$route.params.sum
            }
            const res = await myAxios.post('/question/getQuesBy', ques);
            console.log(res.data)
        }
    }
</script>

<style scoped>

</style>