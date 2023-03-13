<template>
    <div style="background-color:#fff; padding: 20px">
        <div style="margin: 20px">
            <a-space size="large">
                <a-button style="width: 100px" type="primary" block @click="article"> 写文章</a-button>
                <a-range-picker @change="onChange" :locale="locale" style="width: 200px"/>
                <!--                <a-select
                                        mode="multiple"
                                        style="width: 200px"
                                        placeholder="请选择标签"
                                        @change="tagChange"
                                >
                                    <a-select-option v-for="item in tags" :key="item.id">
                                        {{item.tagName}}
                                    </a-select-option>
                                </a-select>-->
                <a-button type="primary" @click="search">搜索</a-button>
            </a-space>
        </div>
        <div>
            <data-list :data-list="dataList"/>
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
            <a-back-top/>
        </div>
    </div>
</template>

<script>
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import myAxios from "@/axios/myAxios";
    import DataList from "@/components/postCenter/manager/DataList";
    import moment from 'moment'

    export default {
        name: "ContentManager",
        components: {DataList},
        data() {
            return {
                locale,
                tags: [],
                dataList: [],
                selectActions: {
                    startTime: '',
                    endTime: '',
                    tags: [],
                    curPage: 0,
                    pageSize: 10,
                },
                loading: true,
                loadingMore: false,
                showLoadingMore: true,
                finish: false
            }
        },
        mounted() {
            this.getTags()
            this.getPost()
        },
        methods: {
            search() {
                this.selectActions.curPage = 0;
                this.dataList = []
                this.finish = false
                this.getPost();
            },
            onLoadMore() {
                this.getPost();
            },
            article() {
                const route = this.$router.resolve({
                    path: '/writeArticle',
                })
                window.open(route.href, '_blank');//打开新的窗口
            },
            getPost() {
                if (this.finish) {
                    this.$message.warning('暂无数据，请勿重复点击');
                    return;
                }
                const that = this;
                this.selectActions.curPage++;
                that.loadingMore = true;
                that.loading = true;
                myAxios.post(`post/getPostActions`, this.selectActions)
                    .then(function (res) {
                        if (res.data.length == 0) {
                            that.finish = true;
                            that.$message.warning('暂无数据');
                        }
                        that.dataList = [...that.dataList, ...res.data]

                        that.loadingMore = false;
                        that.loading = false;
                    })
            },
            getTags() {
                const that = this;
                myAxios.get('/tag/getTags')
                    .then(function (res) {
                        that.tags = res.data

                    })
            },
            tagChange(value) {
                this.selectActions.tags = value;
            },
            onChange(date, dateString) {

                this.selectActions.startTime = moment(dateString[0]);
                this.selectActions.endTime = moment(dateString[1]);
            },
        },
    }
</script>

<style scoped>

</style>