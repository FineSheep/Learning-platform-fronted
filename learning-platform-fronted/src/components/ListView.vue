<template>
    <Comment
            v-model="data"
            :user="currentUser"
            :before-submit="addComment"
            :before-delete="deleteComment"
            :before-like="likeComment"
            :upload-img="uploadOrCopyImg"
            :props="props"
    />
</template>
<script>
    import Comment from 'vue-juejin-comment'

    export default {
        name: 'ListView',
        components: {Comment},
        data() {
            return {
                data: [],
                props: {},
                currentUser: {
                    name: '',
                    avatar: '',
                    author: false,
                },
            }
        },
        methods: {
            addComment(comment, parent, add) {
                // ...
                console.log(comment )
             const newComment ={
                 id: '', // 唯一 id，必需
                 content: '111', // 评论内容，必需
                 imgSrc: '', // 评论中的图片地址，非必需
                 children: [], // 子评论（回复），非必需
                 likes: 0, // 点赞数，非必需
                 liked: false, // 是否已点赞，非必需
                 reply: null, // 子评论（回复）人信息，非必需
                 createAt: null, // 评论时间，必需
                 user: { // 评论人信息，必需
                     author: true // 是否为作者，类型为 Boolean，非必需
                 }
             }
                // 需调用 add 函数，并传入 newComment 对象
                add(newComment)
            },
            deleteComment(comment, parent) {
                // ...
            },
            likeComment(comment) {
                // ...
            },
            uploadOrCopyImg({file, callback}) {
                // ...
                this.$message.error("此功能正在开发中....尽情期待")
               // callback(imgUrl) // 图片地址必传
            },
        },
    }
</script>
<style scoped>

</style>