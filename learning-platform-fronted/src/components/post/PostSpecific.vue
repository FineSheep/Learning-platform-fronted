<template>
    <div>
        <div v-html="markdownToHtml"></div>
    </div>


</template>

<script>
    import myAxios from "@/axios/myAxios";
    import {marked} from 'marked';

    export default {
        name: "PostSpecific",
        data() {
            return {
                markdown: "# 22"
            };
        },
        computed: {
            markdownToHtml() {
                return marked(this.markdown);
            }
        },
        async created() {
            const res = await myAxios.get("/post/getPost?postId=" + 4);
            this.markdown = res.data.content
        }
    }
</script>

<style scoped>

</style>