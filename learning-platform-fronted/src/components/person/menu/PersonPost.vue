<template>
    <div>
        <div v-if="!isEmpty" style="padding: 20px">
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
                    <a slot="actions">更多</a>
                    <a-list-item-meta
                            :description="item.description"
                    >
                        <a-avatar
                                slot="avatar"
                                :src="item.user.avatarUrl"
                        />
                    </a-list-item-meta>

                    <div>
                        <a-tag v-if="item.reviewStatus==0" color="orange">
                            正在审核
                        </a-tag>
                        <div v-if="item.reviewStatus==2">
                            <a-tag color="red" @click="showDrawer" class="point">
                                审核失败(点击查看原因)
                            </a-tag>
                            <a-drawer
                                    title="失败原因"
                                    placement="right"
                                    :closable="false"
                                    :visible="visible"
                                    @close="onClose"
                                    destroyOnClose
                            >
                                <p>{{item.reviewMessage}}</p>
                            </a-drawer>
                        </div>
                        <a-tag v-if="item.reviewStatus==1" color="green">
                            审核通过
                        </a-tag>
                    </div>
                </a-list-item>
            </a-list>
        </div>
        <div class="empty" v-else>
            <a-empty/>
        </div>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "PersonPost",
        data() {
            return {
                curPage: 0,
                pageSize: 10,
                isEmpty: false,
                loading: true,
                loadingMore: false,
                showLoadingMore: true,
                data: [],
                finish: false,
                visible: false,
            }
        },
        mounted() {
            this.getPost()
        },
        methods: {
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
            confirm(index, id) {
                this.data.splice(index, 1)
                this.$message.success('删除成功')
                console.log(id)
                myAxios.get('post/deletePost?postId=' + id)
            },
            onLoadMore() {
                this.getPost();
            },
            getPost() {
                if (this.finish) {
                    this.$message.info('暂无数据，请勿重复点击');
                    return;
                }
                const that = this;
                const userId = localStorage.getItem('userId');
                this.curPage++;
                myAxios.get(`post/getPostByUserId?userId=${userId}&curPage=${this.curPage}&pageSize=${this.pageSize}`)
                    .then(function (res) {
                        if (res.data.length == 0) {
                            if (that.curPage == 1) {
                                that.isEmpty = true;
                                return;
                            }
                            that.finish = true;
                            that.$message.info('暂无数据');
                        }
                        that.loadingMore = true;
                        that.loading = true;
                        that.data = [...that.data, ...res.data]
                        console.log(res.data)
                        that.loadingMore = false;
                        that.loading = false;
                    })
            }
        }
    }
</script>

<style scoped>
    .point:hover {
        cursor: pointer;
    }

    .box {
        overflow: hidden; /* 隐藏溢出文本 */
        text-overflow: ellipsis; /* 溢出文本省略号显示 */
        word-break: break-all; /* 在恰当的断字点进行自动换行 */
        display: -webkit-box; /* 伸缩盒子 */
        -webkit-box-orient: vertical; /* 伸缩盒子子元素的排列方式 */
        -webkit-line-clamp: 3; /* 显示的行数 */
    }

    .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
    }
</style>