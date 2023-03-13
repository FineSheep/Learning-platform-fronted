<template>
    <div>
        <sys-title title="消息发送"/>
        <div style="background-color:white;">
            <div id="components-form-demo-advanced-search">
                <a-form class="ant-advanced-search-form">
                    <a-row :gutter="24">
                        <a-col
                                :span="6"
                        >
                            <a-form-item label="类型">
                                <a-select
                                        @change="changeType"
                                        v-model="type"
                                        style="width: 200px"
                                        placeholder="请选择类型"
                                >
                                    <a-select-option key="0">具体发送</a-select-option>
                                    <a-select-option key="1">群体发送</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6" v-show="type==0">
                            <a-form-item label="用户">
                                <a-select
                                        show-search
                                        :value="value"
                                        placeholder="请输入用户名"
                                        style="width: 250px"
                                        :default-active-first-option="false"
                                        :show-arrow="false"
                                        :filter-option="false"
                                        :not-found-content="null"
                                        @search="search"
                                        @change="change"
                                >
                                    <a-select-option v-for="item of userData" :key="item.id">
                                        {{item.username}}----{{item.email}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24" :style="{ textAlign: 'left' }">
                            <a-button type="primary" @click="sendMessage">
                                发送
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
        <div>
            <div style="border: 1px solid #ccc;">
                <Toolbar
                        style="border-bottom: 1px solid #ccc"
                        :editor="editor"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                />
                <Editor
                        style="height: 500px; overflow-y: hidden;"
                        v-model="html"
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        @onCreated="onCreated"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import SysTitle from "@/components/system/model/SysTitle";
    import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
    import myAxios from "@/axios/myAxios";

    export default {
        name: "MessSend",
        components: {SysTitle, Editor, Toolbar},
        data() {
            return {
                type: undefined,
                editor: null,
                html: '',
                toolbarConfig: {},
                editorConfig: {placeholder: '请输入内容...'},
                mode: 'default', // or 'simple'
                userData: [],
                value: undefined,
            }
        },
        methods: {
            changeType(val) {
                this.type = val;
            },
            sendMessage() {
                if (this.type == undefined) {
                    this.$message.error('请选择收件人');
                    return;
                }
                if (this.type == 0) {
                    if (this.value == undefined) {
                        this.$message.error('请选择收件人');
                        return;
                    }
                }
                if (this.html == '<p><br></p>') {
                    this.$message.error('请填写内容');
                    return;
                }
                const that = this;
                myAxios.post(`/sysMessage/messageSend`, {
                    type: this.type,
                    userId: this.value,
                    content: this.html
                })
                    .then(function (res) {
                        that.$message.success("发送成功");
                    })
            },
            change(val) {
                this.value = val;
            },
            search(val) {
                const that = this;
                myAxios.get(`/sysUser/byName?name=${val}`)
                    .then(function (res) {
                        that.userData = res.data
                    })
            },
            onCreated(editor) {
                this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            },
        },
        mounted() {
        },
        beforeDestroy() {
            const editor = this.editor
            if (editor == null) return
            editor.destroy() // 组件销毁时，及时销毁编辑器
        }
    }
</script>
<style src="@wangeditor/editor/dist/css/style.css">
</style>
<style scoped>

    .ant-advanced-search-form {
        border-radius: 6px;
        background-color: #fff;
        margin: 20px;
    }

    .ant-advanced-search-form .ant-form-item {
        display: flex;
    }

    .ant-advanced-search-form .ant-form-item-control-wrapper {
        flex: 1;
    }

    #components-form-demo-advanced-search .ant-form {
        max-width: none;
    }

    #components-form-demo-advanced-search {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: white;
        min-height: 50px;
        text-align: center;
    }

    .search-result-list {
        background-color: #fff;
    }
</style>