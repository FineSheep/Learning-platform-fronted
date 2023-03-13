<template>
    <div style="width: 80%; margin: 0 auto">
        <mavon-editor
                :value="markdown"
                :subfield="false"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="true"
                :ishljs="true"
        />
        <div>
            <post-comment :post="post"/>
        </div>
        <div>
            <a-back-top/>
        </div>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    // 导入组件 及 组件样式
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import PostComment from "@/components/post/PostComment";

    export default {
        name: "PostSpecific",
        components: {PostComment, mavonEditor},
        data() {
            return {
                markdown: "",
                post: {
                    postId: 0,
                    userId: 0
                },
                judge: {
                    thumbed: false,
                    collected: false
                }
            };
        },
        created() {
            this.getPost()
        },
        methods: {
            getPost() {
                const that = this;
                const id = this.$route.query.postId;
                this.post.postId = id;
                myAxios.get(`/post/getPost?postId=${id}`)
                    .then(function (res) {
                        that.post.userId = res.data.user.id
                        that.markdown = res.data.content
                    })
            },

        }
    }
</script>

<style scoped>

</style>