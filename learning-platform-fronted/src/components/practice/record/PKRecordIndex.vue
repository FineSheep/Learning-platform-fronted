<template>
    <div style="position: relative">
        <practice-record :radio="radio" :mul-choice="mulChoice"/>
        <div class="opponent-box">
            <p style="text-align: center">对手信息：{{opponentName}}</p>
            <a-space>
                <a-avatar :src="opponentUrl" :size="64"/>
                <div>
                    <p>用时：{{time}}s</p>
                    <p>正确：{{correct}}</p>
                    <p>对局结果：{{userResult}}</p>
                </div>
            </a-space>
        </div>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    import PracticeRecord from "@/components/practice/record/PracticeRecord";

    export default {
        name: "PKRecordIndex",
        components: {PracticeRecord},
        data() {
            return {
                radio: [],
                mulChoice: [],
                opponentUrl: '',
                time: 0,
                correct: 0,
                opponentName: '',
                result: false
            }
        },
        mounted() {
            this.getRecords()
        },
        computed: {
            userResult() {
                if (this.result) {
                    return "胜利";
                }
                return "失败";
            }
        },
        methods: {
            getRecords() {
                const that = this;
                const id = this.$route.query.recordId;
                myAxios.get(`/question/getPkDetails?recordId=${id}`)
                    .then(function (res) {

                        that.radio = res.data.radio
                        that.mulChoice = res.data.multi
                        that.opponentUrl = res.data.opponentUrl
                        that.time = res.data.time
                        that.correct = res.data.correct
                        that.opponentName = res.data.opponentName
                        that.result = res.data.result
                    })
            }
        }
    }
</script>

<style scoped>
    .opponent-box {
        background-color: white;
        position: absolute;
        width: 200px;
        height: 200px;
        left: 20px;
        top: 50px;
        font-weight: 600;
        font-size: 15px;
    }
</style>