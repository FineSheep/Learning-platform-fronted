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
                    <a slot="actions">删除</a>
                    <a slot="actions">更多</a>
                    <a-list-item-meta
                            :description="item.description"
                    >
                        <a slot="title" href="https://www.antdv.com/">{{ item.username }}</a>
                        <a-avatar
                                slot="avatar"
                                :src="item.user.avatarUrl"
                        />
                    </a-list-item-meta>
                    <div>{{item.createTime}}</div>
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
            }
        },
        mounted() {
            this.getPost()
        },
        methods: {
            onLoadMore() {
                this.getPost();
            },
            getPost() {
                const that = this;
                const userId = localStorage.getItem('userId');
                this.curPage++;
                console.log(this.curPage)
                myAxios.get(`post/getPostByUserId?userId=${userId}&curPage=${this.curPage}&pageSize=${this.pageSize}`)
                    .then(function (res) {
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
    .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
    }
</style>