<template>
    <div>
        <start-button/>
        <div class="box">
            <div
                    v-infinite-scroll="getData"
                    infinite-scroll-disabled="busy"
                    :infinite-scroll-distance="10"
                    style="background-color: white; padding: 20px"
            >
                <div v-if="records.length!=0">
                    <a-list :grid="{  column: 3}" :data-source="records">
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            <a-card hoverable style="width: 200px;margin-left: 20px" @click="getRecord(item.id)">
                                <a-card-meta :title="title">
                                </a-card-meta>
                                <br/>
                                <div>
                                    <img src="../../../assets/time.svg"/>
                                    用时：{{timeTransform(item.answerTime)}}
                                </div>
                                <div>
                                    <img src="../../../assets/practice.svg"/>
                                    总数：{{item.sum}}道
                                </div>
                                <div>
                                    <img src="../../../assets/correct.svg"/>
                                    正确：{{item.currectSum}}道
                                </div>
                            </a-card>
                        </a-list-item>
                    </a-list>
                </div>
                <div class="empty" v-else>
                    <a-empty description="暂无记录，快去练习吧。"></a-empty>
                </div>
            </div>


        </div>
    </div>

</template>

<script>

    import myAxios from "@/axios/myAxios";
    import StartButton from "@/components/practice/index/StartButton";
    import infiniteScroll from 'vue-infinite-scroll';

    export default {
        name: "PersonPractice",
        components: {StartButton},
        directives: {infiniteScroll},
        data() {
            return {
                title: '个人练习',
                records: [],
                loading: false,
                busy: false,
                curPage: 1,
                pageSize: 10,
                count: 0
            }
        },
        methods: {
            async fetchData() {
                const res = await myAxios.get(`/records/getRecords?curPage=${this.curPage}&pageSize=${this.pageSize}`);
                console.log('records', res)
                return res.data;
            },
            async getData() {
                this.loading = true;
                const data = await this.fetchData()
                if (data.length == 0) {
                    this.$message.warning("数据加载完毕！");
                    this.busy = true;
                    this.loading = false;
                }
                this.records = [...this.records, ...data]
                this.loading = false;
                this.curPage++;
            },
            timeTransform(time) {
                let minute = 0;
                while (time >= 64) {
                    time %= 64;
                    minute++;
                }
                return (minute == 0 ? '' : minute + '分') + time + '秒';
            },
            getRecord(id) {
                this.$router.push({
                    query:{
                        recordId:id
                    },
                    path:'/record'
                })
            }
        },
    }
</script>

<style scoped>
    img {
        height: 15px;
        width: 15px;
        margin-top: -3px;
        margin-right: 2px;
    }

    .box {
        margin-top: 20px;
        background-color: white;
        height: 450px;
    }

    .empty {
        height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>