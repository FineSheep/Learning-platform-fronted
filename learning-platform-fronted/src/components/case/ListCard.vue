<template>

    <div v-infinite-scroll="getData"
         :infinite-scroll-disabled="busy"
         :infinite-scroll-distance="10"
         style="background-color: white; padding: 20px"
    >
        <a-list item-layout="vertical" size="large" :data-source="data">
            <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                <template slot="actions">
        <span>
          <a-icon type="star-o" style="margin-right: 8px"/>
          {{item.collectNum}}
        </span><span>
          <a-icon type="like-o" style="margin-right: 8px"/>
          {{item.thumbNum}}
        </span><span>
          <a-icon type="message" style="margin-right: 8px"/>
          {{ item.commentNum }}
        </span>
                </template>
                <img
                        slot="extra"
                        width="272"
                        height="150"
                        alt="logo"
                        :src="item.photo"
                />
                <a-list-item-meta :description="item.createTime">
                    <a slot="title">{{ item.title }}</a>
                    <a-avatar slot="avatar" :src="item.user.avatarUrl"/>
                </a-list-item-meta>
                <div class="box">
                    {{ item.content }}
                </div>
            </a-list-item>
        </a-list>
        <div v-if="loading && !busy" class="demo-infinite-container">
            <a-spin/>
        </div>

    </div>

</template>
<script>
    import myAxios from "@/axios/myAxios";
    import infiniteScroll from 'vue-infinite-scroll';

    export default {
        name: "ListCard",
        directives: {infiniteScroll},
        data() {
            return {
                pageSize: 10,
                curPage: 0,
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
        methods: {
            async fetchData() {
                const res = await myAxios.get(`/post/getPosts?curPage=${this.curPage}&pageSize=${this.pageSize}`);
                const data = res.data;
                return data;
            },
            async getData() {
                const data = await this.fetchData();
                if (data.hasNext) {
                    this.loading = true;
                    this.data = [...this.data, ...data.records]
                    this.loading = false;
                    this.curPage++;
                } else {
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
        height: 100%;
        overflow-y: auto;
    }

</style>
