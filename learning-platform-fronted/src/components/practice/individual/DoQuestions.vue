<template>
    <div>
        <question-index :radio="this.questions.radio" :mul-choice="this.questions.mulChoice"/>
    </div>
</template>


<script>
    import myAxios from "@/axios/myAxios";
    import QuestionIndex from "@/components/practice/individual/QuestionIndex";

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
                difficulty: this.$route.query.difficulty,
                source: this.$route.query.source,
                sum: this.$route.query.sum
            }
            const res = await myAxios.post('/question/getQuesBy', req);
            this.questions.radio = res.data[0];
            this.questions.mulChoice = res.data[1];

        }
    }
</script>

<style scoped>

</style>