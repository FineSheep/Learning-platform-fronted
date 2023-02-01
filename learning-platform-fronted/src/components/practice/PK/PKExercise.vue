<template>

    <!--    <div>
            <question-index :radio="this.getRadio" :mul-choice="this.getMulChoice"/>
        </div>-->
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
                        <get-timer class="title-right"/>
                    </div>
                </a-page-header>
            </div>
        </a-affix>
        <div>
            <div class="center">
                <ques-list :radio="this.getRadio" :mulChoice="this.getMulChoice"/>
            </div>
        </div>
    </div>
</template>

<script>
    import GetTimer from "@/components/practice/individual/GetTimer";
    import QuesList from "@/components/practice/individual/QuesList";
    import {mapGetters} from 'vuex'
    import myAxios from "@/axios/myAxios";

    export default {
        name: "PKExercise",
        components: {QuesList, GetTimer},
        data() {
            return {}
        },
        computed: {
            ...mapGetters('Exercise', ['getRadio', 'getMulChoice'])
        },
        mounted() {
            this.getInfo()
        },
        created() {
            this.$bus.$on('getAnswer', this.getAnswer);
            this.$bus.$on('getTime', this.getTime);
            this.$bus.$on('putAnswer', this.putAnswer);
        },
        beforeDestroy() {
            this.$bus.$off('getAnswer');
            this.$bus.$off('getTime');
            this.$bus.$off('putAnswer');
        },
        methods: {
            getInfo() {
                let user = this.$route.query.user;
                let opponent = this.$route.query.opponent;
                console.log(user, opponent)
            },
            getTime(time) {
                this.answer.time = time;
            },
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
                    userId: Number(localStorage.getItem('userId')),
                    time: this.answer.time,
                })
                this.$message.success("提交成功");
            },
            confirm() {
                this.$bus.$emit('send');
                this.$bus.$emit('sendTime');
                const that = this;
                this.$confirm({
                    content: '确认交卷吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        that.putAnswer();
                        that.$router.back();
                    },
                    onCancel() {
                    },
                });
            },
            getAnswer(answer) {
                this.answer.answer = answer
                console.log(this.answer.answer)
            },
            back() {
                this.confirm();
            }
        }
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