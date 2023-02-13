<template>
    <div
            v-infinite-scroll="getData"
            infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
            style="background-color: white; padding: 20px"
    >
        <a-list item-layout="vertical" size="large" :data-source="data">
            <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                <a-list-item-meta :description="item.putTime">
                    <a slot="title" @click="toHtml(item.id)">{{ item.title }}</a>
                </a-list-item-meta>
                <div class="box">
                    {{ item.content }}
                </div>
            </a-list-item>
        </a-list>
        <div v-if="loading && !busy" class="demo-infinite-container">
            <a-spin/>
        </div>
        <div>
            <a-back-top/>
        </div>
    </div>
</template>
<script>
    import infiniteScroll from 'vue-infinite-scroll';
    import myAxios from "@/axios/myAxios";

    export default {
        name: "ListCard",
        directives: {infiniteScroll},
        data() {
            return {
                data: [],
                loading: false,
                busy: false,
                curPage: 1,
                pageSize: 10,
            };
        },
        methods: {
            toHtml(id) {
                console.log(id)
                this.$router.push({
                    query: {
                        postId: id,
                    },
                    path: '/postNews'
                })
            },
            async fetchData() {
                const data = await myAxios.get(`/information/getInfo?curPage=${this.curPage}&pageSize=${this.pageSize}`)
                console.log(data)
                return data.data;
            },
            async getData() {
                const data = await this.fetchData()
                console.log(data)
                this.loading = true;
                this.data = [...this.data, ...data]
                this.loading = false;
                this.curPage++;
                if (data.length == 0) {
                    this.$message.warning("数据加载完毕！");
                    this.busy = true;
                    this.loading = false;
                }
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
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        overflow: auto;
        padding: 8px 24px;
        height: 500px;
    }

</style>
