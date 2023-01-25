<template>
    <div style="background-color: rgb(248,248,248);">
        <a-affix>
            <div class="center">
                <a-page-header
                        class="title"
                        title="退出答题"
                        @back="back()"
                >
                    <div>
                        <a-button type="primary" style="right: 100px;top: 20px" class="title-right" @click="confirm">
                            交卷
                        </a-button>
                        <!--                        <a-modal v-model="visible" title="Basic Modal">
                                                    <p>Some contents...</p>
                                                    <p>Some contents...</p>
                                                    <p>Some contents...</p>
                                                </a-modal>-->
                        <get-timer class="title-right"/>
                    </div>
                </a-page-header>
            </div>
        </a-affix>
        <div>
            <div class="center">
                <ques-list :radio="questions.radio" :mulChoice="questions.mulChoice"/>
            </div>

        </div>
    </div>

</template>


<script>
    import myAxios from "@/axios/myAxios";
    import GetTimer from "@/components/practice/GetTimer";
    import QuesList from "@/components/practice/QuesList";

    export default {
        name: "QuestionIndex",
        components: {QuesList, GetTimer},
        data() {
            return {
                visible: false,
                questions: {
                    radio: [],
                    mulChoice: []
                },
                answer: {
                    answer: new Map(),
                    quesIds: []
                }
            }
        },
        created() {
            this.getQues()
            this.$bus.$on('getAnswer', this.getAnswer)
        },

        methods: {
            quesIds() {
                for (let radioId of this.questions.radio) {
                    this.answer.quesIds.push(radioId.id);
                }
                for (let mulId of this.questions.mulChoice) {
                    this.answer.quesIds.push(mulId.id);
                }
            },
            _strMapToObj(strMap) {
                let obj = Object.create(null);
                for (let [k, v] of strMap) {
                    obj[k] = v;
                }
                return obj;
            },
            putAnswer() {
                this.quesIds();
                console.log(this.answer.quesIds)
                myAxios.post('/question/putAnswer', {
                    quesIds: this.answer.quesIds,
                    answer: this._strMapToObj(this.answer.answer),
                })
            },
            confirm() {
                this.$bus.$emit('send');
                const that = this;
                this.$confirm({
                    content: '确认交卷吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        that.putAnswer();
                        // that.$router.back();
                    },
                    onCancel() {
                    },
                });
            },
            getAnswer(answer) {
                this.answer.answer = answer
                console.log(this.answer.answer)
            },
            handleClick(e, link) {
                e.preventDefault();
                console.log(link);
            },
            async getQues() {
                let ques = {
                    userId: this.$route.params.userId,
                    difficulty: this.$route.params.difficulty,
                    source: this.$route.params.source,
                    sum: this.$route.params.sum
                }
                const res = await myAxios.post('/question/getQuesBy', ques);
                this.questions.radio = res.data[0];
                this.questions.mulChoice = res.data[1];
                console.log(this.questions.radio, this.questions.mulChoice)

            },
            back() {
                this.$router.back();
            }
        },
    }
</script>

<style scoped>


    .center {
        width: 60%;
        margin: 0 auto;
        background-color: white;
        padding: 0 10px;
    }

    .title-right {
        position: absolute;
        right: 0;
        top: 25px;
    }
</style>