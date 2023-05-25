<template>
    <div class="news">
        <h3 class="title-box">
            <div class="title">
                {{news.title}}
            </div>
        </h3>
        <a-space size="large" class="middle">
            <span>来源：{{news.source}}</span>
            <span>发布时间：{{news.putTime}}</span>
            <a :href="news.link">点击跳转</a>
        </a-space>
        <div class="content">
            {{news.content}}
        </div>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "PostNews",
        data() {
            return {
                news: {},
            }
        },

        mounted() {
            this.getNews()
        },
        methods: {
            getNews() {
                const that = this;
                const postId = this.$route.query.postId;
                myAxios.get('/information/getNewById?id=' + postId)
                    .then(function (res) {

                        that.news = res.data;
                    })
            }
        }
    }
</script>

<style scoped>
    .title-box {
        font-weight: 600;
        font-size: 20px;
    }

    .title {
        text-align: center;
        width: 600px;
        margin: 20px auto;
    }

    .content {
        white-space: pre-line;
        font-size: 18px;
        line-height: 30px;
    }

    .news {
        background-color: #fff;
        padding: 20px;
        width: 80%;
        margin: 0 auto;
    }

    .middle {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>