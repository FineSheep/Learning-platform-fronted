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
                        <a-button type="primary" @click="confirm">
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
        <a-affix :style="{'position':'absolute','width': '300px', 'margin-top': '50px'}" :offset-top="100">
            <div style="width: 150px;margin: auto auto">
                <div class="PKWord">
                    <a-avatar size="large" icon="user" :src="user.avatarUrl"/>
                    <br/>
                    <div class="word">{{user.username}}</div>
                </div>
                <div class="PKWord" style="left: 120px;top:10px">
                    <img :src="pkUrl">
                </div>
                <div class="PKWord" style="left: 200px">
                    <a-avatar size="large" icon="user" :src="opponent.avatarUrl"/>
                    <br/>
                    <div class="word">{{opponent.username}}</div>
                </div>
            </div>
        </a-affix>
        <div class="center">
            <ques-list :radio="this.getRadio" :mulChoice="this.getMulChoice"/>
        </div>
    </div>
</template>

<script>
    import QuesList from "@/components/practice/individual/QuesList";
    import {mapGetters} from 'vuex'
    import myAxios from "@/axios/myAxios";
    import pk from '@/assets/pk.svg'
    import userJS from '@/userJs/user'
    import CountDown from 'vue2-countdown'
    import moment from "moment";

    export default {
        name: "PKExercise",
        components: {QuesList, CountDown},
        data() {
            return {
                pkUrl: pk,
                opponent: {},
                user: {},
                answer: {
                    answer: new Map(),
                    quesIds: [],
                    startTime: {},
                }
            }
        },
        computed: {
            ...mapGetters('Exercise', ['getRadio', 'getMulChoice', 'getAnswers', 'getTime']),
            start() {
                return moment(this.startTime).valueOf();

            },
            endTime() {
                return moment(this.startTime).add(10, 'minutes').valueOf();
            }
        },
        created() {
            this.$bus.$on('putAnswer', this.putAnswer);
            this.startTime = moment();
        },
        beforeDestroy() {
            this.$bus.$off('putAnswer');
        },
        mounted() {
            this.getInfo()
            this.$socket.sendSock({
                'type': 'PLAY_GAME',
                'receiver': this.$route.query.opponent
            })
        },
        methods: {
            countDownE_cb: function () {
                this.putAnswer();
                this.$router.back();
            },
            async getInfo() {
                let opponent = this.$route.query.opponent;
                console.log(opponent)
                //从远程处获取用户信息
                const opponentInfo = await myAxios.get("/user/person?personId=" + opponent);
                if (opponentInfo.code == 0) {
                    this.opponent = opponentInfo.data;
                }
                let currentUser = await userJS.getCurrentUser();
                this.user = currentUser;
            },
            quesIds() {
                if (this.getRadio != null) {
                    for (let radioId of this.getRadio) {
                        this.answer.quesIds.push(radioId.id);
                    }
                }
                if (this.getMulChoice != null) {
                    for (let mulId of this.getMulChoice) {
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
                this.$bus.$emit('send');
                const time = moment().diff(this.startTime) / 1000// 返回秒数
                console.log(time)
                let userAnswer = {
                    type: 'GAME_OVER',
                    quesIds: this.answer.quesIds,
                    answer: this._strMapToObj(this.getAnswers),
                    time: Math.floor(time),
                    opponent: this.$route.query.opponent,
                    userId: localStorage.getItem("userId")
                }
                this.$socket.sendSock(userAnswer, this.waiting);
            },
            waiting(res) {
                this.$message.success(res.data);
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

    img {
        width: 30px;
        height: 30px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .word {
        display: inline-block;
        word-wrap: break-word;
        width: 50px;
    }

    .PKWord {
        display: inline-block;
        height: 100px;
        margin: auto auto;
        position: absolute;
    }
</style>