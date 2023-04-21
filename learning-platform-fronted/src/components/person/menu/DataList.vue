<template>
    <div>
        <a-list
                class="demo-loadmore-list"
                :loading="loading"
                item-layout="horizontal"
                :data-source="data"
        >
            <div
                    v-if="showLoadingMore"
                    slot="loadMore"
                    :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
            >
                <a-spin v-if="loadingMore"/>
                <a-button v-else @click="onLoadMore">
                    加载更多
                </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a slot="actions">
                    <a-popconfirm title="确认删除吗？" ok-text="Yes" cancel-text="No" @confirm="confirm(index,item.id)">
                        <a> 删除</a>
                    </a-popconfirm>
                </a>
                <a slot="actions" @click="toPost(item.id)">更多</a>
                <a-list-item-meta
                        :description="item.description"
                >
                    <a-avatar
                            slot="avatar"
                            :src="item.user.avatarUrl"
                    />
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "DataList",
        props: ['type', 'dataList'],
        data() {
            return {
                loading: true,
                loadingMore: false,
                showLoadingMore: true,
                data: [],
                curPage: 1,
                pageSize: 10,
                finish: false
            }
        },
        watch: {
            dataList() {
                this.data = this.dataList;
            }
        },
        mounted() {
            this.loadingMore = true;
            this.loading = true;
            this.loadingMore = false;
            this.loading = false;
        },
        methods: {
            toPost(id) {
                this.$router.push({
                    query: {
                        postId: id,
                    },
                    path: '/post'
                })
            },
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
            confirm(index, id) {
                this.data.splice(index, 1)
                this.$message.success('删除成功')

                if (this.type == 'thumb') {
                    myAxios.get(`coTh/thumb?postId=${id}`)
                } else {
                    myAxios.get(`coTh/collect?postId=${id}`)
                }
            },
            onLoadMore() {
                if (this.finish) {
                    this.$message.info('暂无数据，请勿重复点击');
                    return;
                }
                const that = this;
                this.curPage++;
                if (this.type == 'thumb') {
                    myAxios.get(`post/getPostThumb?curPage=${this.curPage}&pageSize=${this.pageSize}`)
                        .then(function (res) {
                            if (res.data.length == 0) {
                                that.finish = true;
                                that.$message.info('暂无数据，请勿重复点击');
                            } else {
                                that.data = [...that.data, ...res.data];
                            }
                        })
                } else {
                    myAxios.get(`post/getPostCollect?curPage=${this.curPage}&pageSize=${this.pageSize}`)
                        .then(function (res) {
                            if (res.data.length == 0) {
                                that.finish = true;
                                that.$message.info('暂无数据，请勿重复点击');
                            } else {
                                that.data = [...that.data, ...res.data];
                            }
                        })
                }
            },
        }
    }
</script>

<style scoped>

</style>