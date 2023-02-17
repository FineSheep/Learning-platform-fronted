<template>
    <div class="box">
        <j-comment
                style="width: 100%"
                :key-map="keyMap"
                :showNumber="2"
                :rank="asc"
                :comment-datas="commentDatas"
                @submitComment="submitComment">
        </j-comment>
    </div>

</template>

<script>
    import userJs from '@/userJs/user'
    import {nanoid} from 'nanoid/non-secure'
    import moment from 'moment'
    import myAxios from "@/axios/myAxios";

    export default {
        name: "PostComment",
        props: ['post'],
        data() {
            return {
                asc: "asc",
                current: {},
                code: "",
                currentPost: this.post,
                keyMap: {
                    pid: "parentId",
                    id: "id",
                    isAdmin: "isAdmin",
                },
                commentDatas: [],
            };
        },
        async mounted() {
            let user = await userJs.getCurrentUser();
            this.current = user;
            console.log(user)
            this.loadComment()
        },
        methods: {
            loadComment() {
                const that = this;
                myAxios.get(`comment/getAllComments?postId=${this.currentPost.postId}`)
                    .then(function (res) {
                        const comments = res.data;
                        for (let comment of comments) {
                            that.commentDatas.push({
                                id: comment.id,
                                isAdmin: that.isAdmin(comment.userId),
                                avatar: comment.avatar,
                                create_time: moment(comment.createTime).startOf('minute').fromNow(),
                                nickname: comment.username,
                                parentId: comment.parentId,
                                content: comment.content,
                            })
                        }
                    })
            },
            isAdmin(currentId) {
                return currentId === this.currentPost.userId ? 1 : 0;
            },
            submitComment(item) {
/*                if (item.content.length > 100) {
                    console.log("====")
                    // alert("sssss")
                    this.$message.warning("文字过长");
                    return
                }*/
                console.log("item: ", item);
                const author = this.isAdmin(this.current.id);
                const id = nanoid(10);
                const content = item.content;
                const parentId = item.pid;
                const postId = this.currentPost.postId;
                const userId = localStorage.getItem('userId');
                let comment = {
                    id: id,
                    isAdmin: author,
                    avatar: this.current.avatarUrl,
                    nickname: this.current.username,
                    create_time: moment().startOf('minute').fromNow(),
                    parentId: parentId,
                    content: content
                }
                this.commentDatas.unshift(comment)
                myAxios.post('comment/addComment', {
                    id, content, parentId, postId, userId
                })
            }
        },

    }
</script>

<style scoped>
    .box {
        background-color: #fff;
    }
</style>