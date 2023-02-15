<template>
    <div>
        <div>
            <a-input placeholder="请输入标题..." class="title-input" v-model="post.title"/>
            <a-button type="primary" @click="show">
                提交
            </a-button>
            <div style="position: relative;z-index: 1">
                <confirm-model :is-visible="visible" @transform="visibleTrans"/>
            </div>
        </div>
        <div style="position: relative;z-index: 2">
            <mavon-editor
                    v-model="post.content"
                    ref="md"
                    @change="change"
                    style="min-height: 600px"
                    @imgAdd="imgAdd"
            />
        </div>

    </div>
</template>

<script>
    // 导入组件 及 组件样式
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import ConfirmModel from "@/components/postCenter/create/ConfirmModel";
    import myAxios from "@/axios/myAxios";

    export default {
        name: "WriteArticle",
        // 注册
        components: {
            ConfirmModel,
            mavonEditor,
        },
        data() {
            return {
                post: {
                    title: '',
                    html: '',// 及时转的html
                    content: '',// 输入的markdown
                    userId: 0,
                    postId: ""
                },
                visible: false,
                confirmLoading: false,
            }
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            async imgAdd(pos, $file) {
                var formdata = new FormData();
                formdata.append('img', $file);
                const res = await myAxios.post("/img/postImg", formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(res);
                if (res.code == 0) {
                    var url = res.data.thUrl;

                    this.$refs.md.$img2Url(pos, url);
                }
            },
            show() {
                this.visible = true;
                this.$bus.$emit('getData', this.post)
            }
            ,     // 所有操作都会被解析重新渲染
            change(value, render) {
                // render 为 markdown 解析后的结果[html]
                this.post.html = render;
            },
            visibleTrans(visible) {
                this.visible = visible;
            }
        },
        mounted() {
            const userId = this.$route.query.userId;
            const postId = this.$route.query.postId;
            const that = this;
            if (postId != undefined) {
                this.post.postId = postId;
                myAxios.get(`/post/getPost?postId=${postId}&userId=${userId}`)
                    .then(function (res) {
                        console.log(res.data)
                        that.post.content = res.data.content
                        that.post.title = res.data.title
                    })
            }
            this.post.userId = userId;
            this.$message.warning("请查看右上角语法文档！！")
            setTimeout(() => {
                this.$message.warning("请查看右上角语法文档！！")
            }, 1000)
        }
    }
</script>

<style scoped>
    .title-input {
        height: 50px;
        border: none;
        font-size: 20px;
        font-weight: 600;
        width: 90%;
    }
</style>