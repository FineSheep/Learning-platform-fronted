<template>
    <div>
        <div v-if="data.length!=0">
            <div v-for="(item,index) in data" :key="item.id">
                <div style="position: relative;">
                    <div class="box">
                        <div class="left">{{item.title}}</div>
                        <div class="right">{{time(item.createTime)}}</div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <a-tag color="green" v-for="(tag,index) in item.tagsName" :key="tag">{{tag}}</a-tag>
                        </div>
                        <div class="right">
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
                    </div>

                    <div class="box">
                        <a-space style="margin-left: 10px;color: lightgrey">
                            <span>点赞：{{item.thumbNum}}</span>
                            <span>收藏 ：{{item.collectNum}}</span>
                        </a-space>
                        <a-space style="margin-right: 10px;float: right">
                            <span @click="editArticle(item.id)">编辑</span>
                            <span @click="toHtml(item)">查看</span>
                            <a-popconfirm title="确认删除吗？" ok-text="Yes" cancel-text="No"
                                          @confirm="confirm(index,item.id)">
                                <span> 删除</span>
                            </a-popconfirm>
                        </a-space>
                    </div>
                    <a-divider dashed/>
                </div>

            </div>
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
        </div>
        <div v-else class="center">
            <a-empty description="暂无数据"/>
        </div>
    </div>

</template>

<script>
    import myAxios from "@/axios/myAxios";
    import moment from 'moment'

    export default {
        name: "DataList",
        props: ['dataList'],
        data() {
            return {
                data: [],
                tagsList: [],
                loading: true,
                loadingMore: false,
                showLoadingMore: true,
                finish: false,
                curPage: 1,
                pageSize: 10,
                visible: false
            }
        },
        watch: {
            dataList() {
                this.data = this.dataList;
            },
            tags() {
                this.tagsList = this.tags;
            }
        },

        methods: {
            editArticle(id) {
                const route = this.$router.resolve({
                    path: '/writeArticle',
                    query: {
                        userId: localStorage.getItem("userId"),
                        postId: id
                    }
                })
                window.open(route.href, '_blank');//打开新的窗口
            },
            toHtml(item) {
                const id = item.id;
                this.$router.push({
                    query: {
                        postId: id,
                    },
                    path: '/post'
                })
            },
            confirm(index, id) {
                this.data.splice(index, 1)
                this.$message.success('删除成功')
                console.log(id)
                myAxios.get('post/deletePost?postId=' + id)
            },
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
            time(time) {
                return moment(time).format('yyyy-MM-DD HH:mm:ss')
            },
            onLoadMore() {
                this.getPost();
            },
            getPost() {
                if (this.finish) {
                    this.$message.warning('暂无数据，请勿重复点击');
                    return;
                }
                const that = this;
                const userId = localStorage.getItem('userId');
                this.curPage++;
                myAxios.get(`post/getPostByUserId?userId=${userId}&curPage=${this.curPage}&pageSize=${this.pageSize}`)
                    .then(function (res) {
                        if (res.data.length == 0) {
                            that.finish = true;
                            that.$message.warning('暂无数据，请勿重复点击');

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
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
        height: 550px;
    }

    span:hover {
        cursor: pointer;
    }

    .box {
        height: 20px;
        margin: 10px;
    }

    .left {
        position: absolute;
        left: 10px;
    }

    .right {
        position: absolute;
        right: 10px;
    }
</style>