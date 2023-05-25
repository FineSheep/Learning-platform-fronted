<template>
    <div>
        <a-modal v-model="visible" :title="item.title" @ok="hideModal">
            <p v-html="item.content"></p>
        </a-modal>
        <div v-for="(item,index) in dataList" :key="item.messageId">
            <div>
                <a-row align="top">
                    <a-col :span="21">
                        <a-space>
                            <span class="link">
                                亲爱的：【{{user.username}}】
                            </span>
                            <span style="color:rgb(165,153,170)">来自管理员的通知：</span>
                            <div style="display: inline-block" v-if="item.isRead">
                                <img class="newMessage" :src="newMessage">
                            </div>
                        </a-space>
                        <a class="word" @click="showModal(item)">
                            <span v-html="item.content"></span>
                        </a>
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
    import userJs from '@/userJs/user'

    export default {
        name: "SystemData",
        props: ['data'],
        data() {
            return {
                visible: false,
                dataList: [],
                user: {},
                newMessage,
                item: {}
            }
        },
        watch: {
            data: {
                immediate: true,
                handler(newVal, oldVal) {
                    this.dataList = newVal;
                    console.log(newVal)
                }
            },
        },
        async mounted() {
            this.user = await userJs.getCurrentUser()
        },
        methods: {
            hideModal() {
                this.visible = false;
            },
            showModal(item) {
                this.item = item;
                const messageId = item.messageId
                item.isRead = 0
                myAxios.get(`/message/readMessage?messageId=${messageId}`)
                this.visible = true;
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
        cursor: pointer;
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