<template>
    <div>
        <start-button/>
        <div v-if="!isEmpty" style="">
            <a-list :grid="{  column: 3}" :data-source="records">
                <a-list-item slot="renderItem" slot-scope="item, index" >
                    <a-card hoverable style="width: 200px;margin-left: 20px" @click="getRecord(item.id)">
                        <a-card-meta :title="title">
                        </a-card-meta>
                        <br/>
                        <!--                <a-icon type="hourglass"/>-->
                        <div>
                            <img src="../../assets/time.svg"/>
                            用时：{{timeTransform(item.answerTime)}}
                        </div>
                        <div>
                            <img src="../../assets/practice.svg"/>
                            总数：{{item.sum}}道
                        </div>
                        <div>
                            <img src="../../assets/correct.svg"/>
                            正确：{{item.currectSum}}道
                        </div>
                    </a-card>
                </a-list-item>
            </a-list>
        </div>
        <div v-else>
            <a-empty description="暂无记录，快去练习吧。"></a-empty>
        </div>
    </div>

</template>

<script>

    import myAxios from "@/axios/myAxios";
    import StartButton from "@/components/practice/StartButton";

    export default {
        name: "PersonPractice",
        components: {StartButton},
        data() {
            return {
                title: '个人练习',
                curPage: 0,
                pageSize: 10,
                records: [],
                isEmpty:true
            }
        },
        methods: {
            timeTransform(time) {
                let minute = 0;
                while (time >= 64) {
                    time %= 64;
                    minute++;
                }
                return (minute == 0 ? '' : minute + '分') + time + '秒';
            },
            getRecord(id){
                console.log(id)
            }
        },
        async mounted() {
            const uid = Number(localStorage.getItem('userId'));
            const records = await myAxios.get(`/records/getRecords?uid=${uid}&curPage=${this.curPage}&pageSize=${this.pageSize}`);
            this.records = records.data.records
            console.log(this.records)
        }
    }
</script>

<style scoped>
img{
    height: 15px;
    width: 15px;
    margin-top: -3px;
    margin-right: 2px;
}
</style>