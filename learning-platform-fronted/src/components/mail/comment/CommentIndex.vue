<template>
    <div v-if="!isEmpty" class="box">
        <div style="position: relative">
            <div style="font-size: 20px;font-weight: 600">评论</div>
            <a-space style="position: absolute;right: 10px">
                <a @click="readAll">一键已读</a>
                <a-popconfirm
                        title="确认清空所有消息?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="removeAll"
                >
                    <a>清空所有</a>
                </a-popconfirm>
            </a-space>
        </div>
        <a-divider/>
        <div style="min-height: 450px">
            <DataList :data="data" msg="回复了你的评论"/>
        </div>
        <div v-if="total!=0" class="bottom">
            <a-pagination v-model="curPage" :total="total" :defaultPageSize="pageSize" size="small" @change="onChange"/>
        </div>
    </div>
    <div v-else style="display: flex;justify-content: center;align-items: center;min-height: 550px">
        <a-empty description="暂无数据"/>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    import DataList from "@/components/mail/data/DataList";

    export default {
        name: "CommentIndex",
        components: {DataList},
        data() {
            return {
                curPage: 1,
                pageSize: 3,
                data: [],
                total: 0,
                isEmpty: false
            }
        },
        mounted() {
            this.getComment()
        },
        methods: {
            removeAll() {
                myAxios.get(`/message/removeAllComment`);
                this.isEmpty = true;
            },
            readAll() {
                myAxios.get(`/message/readAllComment`)
                for (let i = 0; i < this.data.length; i++) {
                    this.data[i].isRead = 1
                }
            },
            getComment() {
                const that = this;
                myAxios.get(`/message/commentMessage?curPage=${this.curPage}&pageSize=${this.pageSize}`)
                    .then(function (res) {
                        if (that.curPage == 1) {
                            if (res.data.data.length == 0) {
                                that.isEmpty = true;
                                return;
                            }
                        }
                        that.data = res.data.data
                        that.total = res.data.count
                    })
            },
            onChange(current) {
                this.current = current;
                this.getComment();
            },
        }
    }
</script>

<style scoped>

    .bottom {
        display: flex;
        justify-content: center;
    }

    .box {
        padding: 24px;
        position: relative;
    }
</style>