<template>
    <div>
        <question-index :radio="this.radio" :mul-choice="this.mulChoice"/>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    import QuestionIndex from "@/components/practice/QuestionIndex";

    export default {
        name: "PKExercise",
        components: {QuestionIndex},
        data() {
            return {
                radio: [],
                mulChoice: []
            }
        },
        mounted() {
            this.getInfo()
            this.getQues()
        },
        methods: {
            getInfo() {
                let user = this.$route.query.user;
                let opponent = this.$route.query.opponent;
                console.log(user, opponent)
            },
            async getQues() {
                const res = await myAxios.get('/question/getQuesRandom');
                this.radio = res.data[0];
                this.mulChoice = res.data[1];
            }
        }
    }
</script>

<style scoped>

</style>