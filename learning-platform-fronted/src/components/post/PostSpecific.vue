<template>
    <div >
        <div v-html="markdownToHtml" class="markdown-body" style="padding: 20px"></div>
    </div>


</template>

<script>
    import myAxios from "@/axios/myAxios";
    import {marked} from 'marked';
    import 'github-markdown-css';

    export default {
        name: "PostSpecific",
        data() {
            return {
                markdown: ""
            };
        },
        computed: {
            markdownToHtml() {
                return marked(this.markdown);
            }
        },
        async created() {
            this.getPost()
            /*            const res = await myAxios.get("/post/getPost?postId=" + 4);
                        this.markdown = res.data.content*/
        },
        methods: {
            async getPost() {
                const id = this.$route.query.postId;
                const type = this.$route.query.type;
                if (type == 'post') {
                    const res = await myAxios.get(`/post/getPost?postId=${id}`)
                    this.markdown = res.data.content
                }
            }
        }
    }
</script>

<style scoped>

</style>