<template>
    <div style="background-color: rgb(248,248,248);">
        <a-affix>
            <div class="center">
                <a-page-header
                        class="title"
                        title="退出答题"
                        @back="back()"
                >
                    <a-space class="title-right">
                        <a-button type="primary"  @click="confirm">
                            交卷
                        </a-button>
                        <count-down
                                class=" time-box time-font"
                                v-on:end_callback="countDownE_cb"
                                :currentTime="start"
                                :startTime="start"
                                :endTime="endTime"
                                minutesTxt="分:"
                                secondsTxt="秒"/>
                    </a-space>
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
    import QuesList from "@/components/practice/individual/QuesList";
    import {mapGetters} from "vuex";
    import CountDown from 'vue2-countdown'
    import moment from 'moment'

    export default {
        name: "QuestionIndex",
        components: {QuesList, CountDown},
        props: ['radio', 'mulChoice'],
        data() {
            return {
                visible: false,
                answer: {
                    answer: new Map(),
                    quesIds: [],
                    startTime: {},
                }
            }
        },
        computed: {
            ...mapGetters('Exercise', ['getAnswers']),
            start() {
                return moment(this.startTime).valueOf();
            },
            endTime() {
                return moment(this.startTime).add(10, 'minutes').valueOf();
            }
        },
        created() {
            this.startTime = moment();
            this.$bus.$on('putAnswer', this.putAnswer);
        },
        beforeDestroy() {
            this.$bus.$off('putAnswer');
        },
        methods: {
            countDownE_cb: function () {
                this.putAnswer();
                this.$router.back();
            },
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
                const time = moment().diff(this.startTime) / 1000// 返回秒数
                myAxios.post('/question/putAnswer', {
                    quesIds: this.answer.quesIds,
                    answer: this._strMapToObj(this.getAnswers),
                    userId: localStorage.getItem('userId'),
                    time: time,
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

    .time-font {
        font-family: Helvetica Neue;
        font-weight: 600;
    }

    .time-box {
        background-color: rgb(238, 240, 241);
        border-radius: 20px;
        padding: 0 10px;
    }
</style>