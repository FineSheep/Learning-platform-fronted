<template>
    <div>
        <div class="hotPost">
            <div>
                <img src="../../../assets/hotAndNew/title-1.png" style="width: 270px;border-radius: 10px;"/>
                <h3 class="word">热门帖子</h3>
                <div>
                    <div v-for="(item,index) in post" :key="item.id"
                         style="margin-top: 10px;margin-left: 10px">
                        <a-row>
                            <a-col :span="4">
                                <img :src="number[index]" class="number"/>
                            </a-col>
                            <a-col :span="20">
                                <div class="box link" @click="postHtml(item)">{{item.title}}</div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </div>
        </div>
        <div class="hotPost" style="margin-top: 20px">
            <div>
                <img src="../../../assets/hotAndNew/title-2.png" style="width: 270px;border-radius: 10px;"/>
                <h3 class="word">最新资讯</h3>
                <div>
                    <div v-for="(item,index) in info" :key="item.id"
                         style="margin-top: 10px;margin-left: 10px">
                        <a-row>
                            <a-col :span="4">
                                <img :src="number[index]" class="number"/>
                            </a-col>
                            <a-col :span="20">
                                <div class="box link" @click="infoHtml(item)">{{item.title}}</div>
                            </a-col>
                        </a-row>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";


    const one = require("../../../assets/hotAndNew/1.png")
    const two = require("../../../assets/hotAndNew/2.png")
    const three = require("../../../assets/hotAndNew/3.png")
    const four = require("../../../assets/hotAndNew/4.png")
    const five = require("../../../assets/hotAndNew/5.png")
    const six = require("../../../assets/hotAndNew/6.png")
    const seven = require("../../../assets/hotAndNew/7.png")
    const eight = require("../../../assets/hotAndNew/8.png")
    const nine = require("../../../assets/hotAndNew/9.png")
    const ten = require("../../../assets/hotAndNew/10.png")
    export default {
        name: "HotAndNew",
        data() {
            return {
                number: [one, two, three, four, five, six, seven, eight, nine, ten],
                info: [],
                post: []
            }
        },
        mounted() {
            const that = this;
            myAxios.get("/information/hotAndNew")
                .then(function (res) {
                    console.log(res.data)
                    that.info = res.data.info;
                    that.post = res.data.post;
                })
        },
        methods: {
            infoHtml(item){
                const id = item.id;
                this.$router.push({
                    query: {
                        postId: id,
                    },
                    path: '/postNews'
                })
            },
            postHtml(item) {
                const id = item.id;
                this.$router.push({
                    query: {
                        postId: id,
                    },
                    path: '/post'
                })
            }
        }
    }
</script>

<style scoped>
    .hotPost {
        background-color: white;
        border-radius: 10px;
        position: relative;
    }

    .number {
        height: 20px;
        width: 20px;
    }

    .box {
        width: 200px;
        overflow: hidden; /* 隐藏溢出文本 */
        text-overflow: ellipsis; /* 溢出文本省略号显示 */
        word-break: break-all; /* 在恰当的断字点进行自动换行 */
        display: -webkit-box; /* 伸缩盒子 */
        -webkit-box-orient: vertical; /* 伸缩盒子子元素的排列方式 */
        -webkit-line-clamp: 1; /* 显示的行数 */
    }

    .word {
        position: absolute;
        top: 20px;
        left: 20px;
        font-weight: 600;
    }

    .link:hover {
        cursor: pointer;
        text-decoration: underline;
    }
</style>