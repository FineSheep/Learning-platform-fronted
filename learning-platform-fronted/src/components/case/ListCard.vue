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
          <a-icon type="star" style="margin-right: 8px" @click="collectOrCancel(item)"
                  v-if="item.collected" theme="filled"/>
            <a-icon type="star" style="margin-right: 8px" @click="collectOrCancel(item)"
                    v-else/>
                    {{item.collectNum}}
        </span><span>
          <a-icon type="like" style="margin-right: 8px" theme="filled" v-if="item.thumbed" @click="thumb(item)"/>
          <a-icon type="like" style="margin-right: 8px" @click="thumb(item)" v-else/>
          {{item.thumbNum}}
        </span><span>
          <a-icon type="message" style="margin-right: 8px"/>
          {{ item.commentNum }}
        </span>
                </template>
                <img
                        slot="extra"
                        width="272"
                        alt="logo"
                        :src="item.photo"
                />
                <div v-for="tag in item.tagsName" :key="tag">
                    <a-tag color="green" style="float: right">
                        {{tag}}
                    </a-tag>
                </div>
                <a-list-item-meta :description="timeFormat(item.createTime)">

                    <a slot="title" @click="toHtml(item)">{{ item.title }}</a>
                    <a-avatar slot="avatar" :src="item.user.avatarUrl"/>
                </a-list-item-meta>

                <div class="box">
                    {{ item.description }}

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
    import myAxios from "@/axios/myAxios";
    import infiniteScroll from 'vue-infinite-scroll';
    import moment from 'moment'

    moment.locale('zh-cn');
    export default {
        name: "ListCard",
        directives: {infiniteScroll},
        data() {
            return {
                pageSize: 10,
                curPage: 0,
                data: [],
                loading: false,
                busy: false,
                collect: 'collect:',
                personCoTh: {}
            };
        },
        created() {
        },
        methods: {
            toHtml(item) {
                const id = item.id;
                this.$router.push({
                    query: {
                        postId: id,
                    },
                    path: '/post'
                })
            },
            thumb(item) {
                if (item.thumbed) {
                    item.thumbed = false;
                    item.thumbNum--;
                } else {
                    item.thumbed = true;
                    item.thumbNum++;
                }
                const userId = Number(localStorage.getItem('userId'));
                myAxios.get(`coTh/thumb?userId=${userId}&postId=${item.id}`)
            },
            timeFormat(time) {
                return moment(time).startOf('hour').fromNow();

            },
            collectOrCancel(item) {
                if (item.collected) {
                    item.collected = false;
                    item.collectNum--;

                } else {
                    item.collected = true;
                    item.collectNum++;
                }
                const userId = Number(localStorage.getItem('userId'));
                myAxios.get(`coTh/collect?userId=${userId}&postId=${item.id}`)
            },
            async fetchData() {
                const userId = Number(localStorage.getItem('userId'));
                const res = await myAxios.get(`/post/getPosts?userId=${userId}&curPage=${this.curPage}&pageSize=${this.pageSize}`);
                const data = res.data;
                return data;
            },
            async getData() {
                const data = await this.fetchData();
                this.loading = true;
                this.data = [...this.data, ...data.records]
                this.loading = false;
                this.curPage++;
                if (!data.hasNext) {
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
        -webkit-line-clamp: 3; /* 显示的行数 */
    }

    .demo-infinite-container {
        height: 100%;
        overflow-y: auto;
    }

</style>
