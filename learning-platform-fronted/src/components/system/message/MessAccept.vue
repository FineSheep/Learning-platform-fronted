<template>
    <div>
        <sys-title title="消息接收"/>
        <div style="background-color:white;">
            <div id="components-form-demo-advanced-search">
                <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                    <a-row :gutter="24">
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="编号">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`id`,
                                        ]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="标题">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`title`]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="内容">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`content`]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="类型">
                                <a-select
                                        style="width: 350px"
                                        placeholder="请选择类型"
                                        v-decorator="['type']"
                                >
                                    <a-select-option key="1">
                                        系统
                                    </a-select-option>
                                    <a-select-option key="4">
                                        举报
                                    </a-select-option>
                                    <a-select-option key="2">
                                        反馈
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="受理">
                                <a-select
                                        style="width: 350px"
                                        placeholder="请选择类型"
                                        v-decorator="['deal']"
                                >
                                    <a-select-option key="0">
                                        已受理
                                    </a-select-option>
                                    <a-select-option key="1">
                                        未受理
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="用户编号">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`userId`]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24" :style="{ textAlign: 'right' }">
                            <a-button type="primary" html-type="submit">
                                查询
                            </a-button>
                            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                                重置
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
        <div class="search-result-list">
            <a-table
                    :rowKey="(record, index) => record.id"
                    :columns="columns"
                    :data-source="data">
                <span slot="content" slot-scope="content">
                    <span>{{getText(content)}}</span>
                </span>
                <span slot="deal" slot-scope="deal,record">
                    <a-switch :checked="deal==0" @click="change(record)">
                         <a-icon slot="checkedChildren" type="check"/>
                         <a-icon slot="unCheckedChildren" type="close"/>
                    </a-switch>
                </span>
                <span slot="type" slot-scope="type">
                   <a-tag v-if="type==1" color="cyan">系统</a-tag>
                   <a-tag v-if="type==2" color="blue">反馈</a-tag>
                   <a-tag v-if="type==4" color="red">举报</a-tag>
                </span>
                <span slot-scope="createTime" slot="createTime">
                    {{getTime(createTime)}}
                </span>
            </a-table>
        </div>
    </div>
</template>

<script>
    import SysTitle from "@/components/system/model/SysTitle";
    import myAxios from "@/axios/myAxios";
    import moment from "moment"

    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            title: '编号',
        },
        {
            dataIndex: 'title',
            key: 'title',
            title: '标题',
        },
        {
            dataIndex: 'content',
            key: 'content',
            title: '内容',
            // ellipsis: true,
            width: 500,
            scopedSlots: {customRender: 'content'},
        },
        {
            dataIndex: 'type',
            key: 'type',
            title: '类型',
            scopedSlots: {customRender: 'type'},
        },
        {
            dataIndex: 'postId',
            key: 'postId',
            title: '帖子编号',
            scopedSlots: {customRender: 'postId'},
        },
        {
            dataIndex: 'quesId',
            key: 'quesId',
            title: '题目编号',
            scopedSlots: {customRender: 'quesId'},
        },
        {
            dataIndex: 'createId',
            key: 'createId',
            title: '发送人编号',
        },
        {
            dataIndex: 'createTime',
            key: 'createTime',
            title: '发送时间',
            scopedSlots: {customRender: 'createTime'},
        },
        {
            dataIndex: 'deal',
            key: 'deal',
            title: '是否受理',
            scopedSlots: {customRender: 'deal'},

        },
    ];
    export default {
        name: "MessAccept",
        components: {SysTitle},
        data() {
            return {
                form: this.$form.createForm(this, {name: 'advanced_search'}),
                data: [],
                columns
            }
        },
        mounted() {
            this.fetchData({
                id: null,
                type: null,
                read: null,
                content: null,
                title: null,
                userId: null,
                deal: null,
            })
        },
        methods: {
            change(record) {
                record.deal = record.deal == 0 ? 1 : 0;
                myAxios.get(`/sysMessage/dealMessage?id=${record.id}&deal=${record.deal}`)
            },
            getTime(time) {
                return moment(time).format('YYYY-MM-DD HH:MM:SS')
            },
            getText(str) {
                if (str == undefined || str.length == 0) {
                    return;
                }
                // 去掉所有的html标记
                let replace = str.replace(/<[^>]+>/g, "");
                // 去掉所有的空格
                return replace.replace(/&nbsp;/ig, '')
            },
            async fetchData(param) {
                const res = await myAxios.post('/sysMessage/listMessage', param);
                this.data = res.data;
            },
            handleReset() {
                this.form.resetFields();
            },
            handleSearch(e) {
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    this.fetchData(values);
                });
            },
        }
    }
</script>

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