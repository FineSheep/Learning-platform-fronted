<template>
    <div style="position: relative">
        <div v-html="markdownToHtml" class="markdown-body" style="padding: 20px"></div>
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
    import {marked} from 'marked';
    import 'github-markdown-css';
    import PostComment from "@/components/post/PostComment";

    export default {
        name: "PostSpecific",
        components: {PostComment},
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
        computed: {
            markdownToHtml() {
                return marked(this.markdown);
            }
        },
        created() {
            this.getPost()
        },
        methods: {
            getPost() {
                const that = this;
                const id = this.$route.query.postId;
                this.post.postId = id;
                myAxios.get(`/post/getPost?postId=${id}&userId=${localStorage.getItem('userId')}`)
                    .then(function (res) {
                        that.post.userId = res.data.user.id
                        that.markdown = res.data.content
                    })
            },

        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
    }
</style>