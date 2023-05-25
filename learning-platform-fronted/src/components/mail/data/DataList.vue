<template>
    <div>
        <div v-for="(item,index) in dataList" :key="item.messageId">
            <div>
                <a-row align="top">
                    <a-col :span="2">
                        <a-avatar :src="item.sendAvatar" size="large"/>
                    </a-col>
                    <a-col :span="19">
                        <a-space>
                            {{item.sendName}}
                            <span style="color:rgb(165,153,170)">{{msg}}</span>
                            <div style="display: inline-block" v-if="item.isRead">
                                <img class="newMessage" :src="newMessage">
                            </div>
                        </a-space>
                        <div class="word" @click="toPost(item)">
                            {{item.content}}
                        </div>
                        <span class="link" @click="toPost(item)">
                            【{{item.title}}】
                        </span>
                    </a-col>
                    <a-col :span="3">
                        <div style="display: flex;flex-direction: column;justify-content: flex-end">
                            <a-popconfirm
                                    title="确认删除吗?"
                                    ok-text="Yes"
                                    cancel-text="No"
                                    @confirm="deleteMessage(index,item.id)"
                            >
                                <a-icon id="icon" type="delete"/>
                            </a-popconfirm>
                            <p style="margin-top: 15px">
                                {{time(item.time)}}
                            </p>
                        </div>

                    </a-col>
                </a-row>
                <a-divider/>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import newMessage from '@/assets/message/newMessage.svg'
    import myAxios from "@/axios/myAxios";

    export default {
        name: "DataList",
        props: ['data', 'msg'],
        data() {
            return {
                dataList: [],
                newMessage

            }
        },
        watch: {
            data: {
                immediate: true,
                handler(newVal, oldVal) {
                    this.dataList = newVal;
                }
            },
        },
        methods: {
            toPost(item) {
                const id =item.postId;
                const messageId =item.messageId;
                myAxios.get(`/message/readMessage?messageId=${messageId}`)
                this.$router.push({
                    query: {
                        postId: id,
                    },
                    path: '/post'
                })
            },
            deleteMessage(index, id) {
                this.dataList.splice(index, 1)
                this.$message.success('删除成功');
                myAxios.get(`/message/removeComment?id=${id}`)
            },
            time(time) {
                return moment(time).format("yyyy-MM-DD")
            }
        }
    }
</script>

<style scoped>
    .word {
        color: #222226;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        margin-top: 8px;
        overflow: hidden; /* 隐藏溢出文本 */
        text-overflow: ellipsis; /* 溢出文本省略号显示 */
        word-break: break-all; /* 在恰当的断字点进行自动换行 */
        display: -webkit-box; /* 伸缩盒子 */
        -webkit-box-orient: vertical; /* 伸缩盒子子元素的排列方式 */
        -webkit-line-clamp: 1; /* 显示的行数 */
    }

    .link {
        display: inline-block;
        cursor: pointer;
        margin-top: 8px;
    }

    .word:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .newMessage {
        height: 40px;
        width: 40px;
    }

    #icon:hover {
        cursor: pointer;
    }
</style>