<template>
    <practice-record :radio="radio" :mulChoice="mulChoice"/>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    import PracticeRecord from "@/components/practice/record/PracticeRecord";

    export default {
        name: "RecordIndex",
        components: {PracticeRecord},
        data() {
            return {
                radio: [],
                mulChoice: []
            }
        },
        mounted() {
            this.getRecords()
        },
        methods: {
            getRecords() {
                const that = this;
                const id = this.$route.query.recordId;
                myAxios.get(`/question/recordDetail?recordId=${id}`)
                    .then(function (res) {
                        console.log(res.data)
                        that.radio = res.data.radio
                        that.mulChoice = res.data.multi
                    })
            }
        }
    }
</script>

<style scoped>


    .option {
        display: block;
        width: 100%;
        height: 40px;
        padding-top: 10px;
        padding-left: 10px;
        /*lineHeight: 30px,*/
    }

    .option:hover {
        background-color: rgb(248, 248, 248);
    }


    .answer-card {
        padding: 10px;
        background-color: white;
        width: 70px;
        text-align: center;
    }

    .card-box {
        position: fixed;
        z-index: 0;
        right: 50px;
    }

    .number-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 200px;
        background-color: white;

    }

    .number {
        color: white;
        background-color: skyblue;
        display: inline-block;
        margin: 5px 5px;
        width: 25px;
        height: 25px;
        line-height: 27px;
        border: 1px solid white;
        border-radius: 50%;
        text-align: center;
    }

</style>