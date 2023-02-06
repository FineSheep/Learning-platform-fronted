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
                        <get-timer class="title-right"/>
                    </div>
                </a-page-header>
            </div>
        </a-affix>
        <div>
            <div class="center">
                <ques-list :radio="this.radio" :mulChoice="this.mulChoice"/>
            </div>
        </div>
    </div>
</template>
<script>
    import myAxios from "@/axios/myAxios";
    import GetTimer from "@/components/practice/individual/GetTimer";
    import QuesList from "@/components/practice/individual/QuesList";
    import {mapGetters} from "vuex";

    export default {
        name: "QuestionIndex",
        components: {QuesList, GetTimer},
        props: ['radio', 'mulChoice'],
        data() {
            return {
                visible: false,
                answer: {
                    answer: new Map(),
                    quesIds: [],
                    time: 0,
                }
            }
        },
        computed: {
            ...mapGetters('Exercise', ['getAnswers', 'getTime'])
        },
        created() {
            this.$bus.$on('putAnswer', this.putAnswer);
        },
        beforeDestroy() {
            this.$bus.$off('putAnswer');
        },
        methods: {
            quesIds() {
                if (this.radio != null) {
                    for (let radioId of this.radio) {
                        this.answer.quesIds.push(radioId.id);
                    }
                }
                if (this.mulChoice != null) {
                    for (let mulId of this.mulChoice) {
                        this.answer.quesIds.push(mulId.id);
                    }
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
                this.$bus.$emit('send');
                this.$bus.$emit('sendTime');
                myAxios.post('/question/putAnswer', {
                    quesIds: this.answer.quesIds,
                    answer: this._strMapToObj(this.getAnswers),
                    userId: Number(localStorage.getItem('userId')),
                    time: this.getTime,
                })
                this.$message.success("提交成功");
            },
            confirm() {
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
            back() {
                this.confirm();
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