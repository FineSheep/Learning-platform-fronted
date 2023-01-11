<template>

    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10"
         style="background-color: white; padding: 20px"
    >
        <a-list item-layout="vertical" size="large" :data-source="data" >
            <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                <template v-for="{ type, text } in actions" slot="actions">
        <span :key="type">
          <a-icon :type="type" style="margin-right: 8px"/>
          {{ text }}
        </span>
                </template>
                <img
                        slot="extra"
                        width="272"
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                <a-list-item-meta :description="item.putTime">
                    <a slot="title">{{ item.title }}</a>
                    <a-avatar slot="avatar" :src="item.avatar"/>
                </a-list-item-meta>
                <div class="box">
                    {{ item.content }}
                </div>
            </a-list-item>
        </a-list>
        <div v-if="loading && !busy" class="demo-loading-container">
            <a-spin/>
        </div>

    </div>

</template>
<script>
    import reqwest from 'reqwest';
    import infiniteScroll from 'vue-infinite-scroll';

    const baseTitle = 'http://127.0.0.1:8080';
    let curPage = 1;
    let pageSize = 10;
    let total = 20;
    const fakeDataUrl = `${baseTitle}/information/getInfo?curPage=${curPage}&pageSize=${pageSize}`;
    export default {
        name: "ListCard",
        directives: {infiniteScroll},
        data() {
            return {
                data: [],
                actions: [
                    {type: 'star-o', text: '156'},
                    {type: 'like-o', text: '156'},
                    {type: 'message', text: '2'},
                ],
                loading: false,
                busy: false,
            };
        },
        destroyed() {
            console.log("销毁了")

        },
        mounted() {
            console.log("挂载中。。。。")
            this.fetchData(res => {
                this.data = res.data.records;
                total = res.data.total;
            });
            console.log(this.data.length)

        },
        methods: {
            fetchData(callback) {
                reqwest({
                    url: fakeDataUrl,
                    type: 'json',
                    method: 'get',
                    contentType: 'application/json',
                    success: res => {
                        callback(res);
                    },
                });
            },
            loadMore() {
                console.log("滚动")
                console.log(`当前第${curPage}页`)
                curPage++;
                console.log(`下一页是：${curPage}页`)
                this.loading = true;
                if (this.data.length >= total) {
                    this.$message.warning("数据加载完毕！");
                    this.busy = true;
                    this.loading = false;
                    return;
                }
                this.fetchData(res => {
                    console.log(res)
                    this.data = this.data.concat(res.data.records);
                    this.loading = false;
                });
            }

        }
    };
</script>
<style scoped>
    .box {
        overflow: hidden; /* 隐藏溢出文本 */
        text-overflow: ellipsis; /* 溢出文本省略号显示 */
        word-break: break-all; /* 在恰当的断字点进行自动换行 */
        display: -webkit-box; /* 伸缩盒子 */
        -webkit-box-orient: vertical; /* 伸缩盒子子元素的排列方式 */
        -webkit-line-clamp: 2; /* 显示的行数 */
    }

    .demo-infinite-container {
        height: 100%;
        overflow-y: auto;
    }

</style>
