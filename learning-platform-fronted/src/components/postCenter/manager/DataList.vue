<template>
    <div>
        <div v-if="data.length!=0">
            <div v-for="(item,index) in data" :key="item.id">
                <div>
                    <div>
                        <div>{{item.title}}</div>
                        <div style="float: right">{{time(item.createTime)}}</div>
                    </div>
                    <div>
                        <div style="width: 80%;margin: 10px">
                            {{item.description}}
                        </div>
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
                    </div>
                    <div>
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
                finish: false,
                visible: false
            }
        },
        watch: {
            dataList() {
                this.data = this.dataList;
            },
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
</style>