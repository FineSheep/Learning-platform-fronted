<template>
    <div>
        <question-index :radio="this.questions.radio" :mul-choice="this.questions.mulChoice"/>
    </div>
</template>


<script>
    import myAxios from "@/axios/myAxios";
    import QuestionIndex from "@/components/practice/QuestionIndex";

    export default {
        name: "DoQuestions",
        components: {QuestionIndex},
        data() {
            return {
                questions: {
                    radio: [],
                    mulChoice: []
                }
            }
        },
        async created() {
            let req = {
                userId: this.$route.params.userId,
                difficulty: this.$route.params.difficulty,
                source: this.$route.params.source,
                sum: this.$route.params.sum
            }
            console.log(req)
            const res = await myAxios.post('/question/getQuesBy', req);
            this.questions.radio = res.data[0];
            this.questions.mulChoice = res.data[1];
            console.log(this.questions)
        }
    }
</script>

<style scoped>

</style>