<template>
    <div>
        <sys-title title="题库管理"/>
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
                            <a-form-item label="类型">
                                <a-select
                                        style="width: 350px"
                                        v-decorator="[`type`]"
                                        placeholder="请选择"
                                >
                                    <a-select-option value="0">单选</a-select-option>
                                    <a-select-option value="1">多选</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12" style="text-align: left">
                            <ques-add/>
                        </a-col>
                        <a-col :span="12" :style="{ textAlign: 'right' }">
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
                <span slot="type" slot-scope="type">
                    <a-tag color="blue" v-if="type==0">单选</a-tag>
                    <a-tag color="orange" v-if="type==1">多选</a-tag>
                </span>
                <span slot-scope="action,record,index" slot="action">
                <a @click="checkUpdate(record,index)">修改</a>
                <a-divider type="vertical"/>
                 <a-popconfirm
                         title="确认删除吗？"
                         ok-text="Yes"
                         cancel-text="No"
                         @confirm="deleteQuestion(record,index)"
                 >
                 <a style="color: red">删除</a>
                     </a-popconfirm>

            </span>
            </a-table>
            <a-modal
                    title="修改题目"
                    :visible="visible"
                    :confirm-loading="confirmLoading"
                    @ok="update"
                    @cancel="cancel"
            >
                <a-form :form="updateForm" layout="horizontal" :label-col="{span:4}" :wrapper-col="{span:18}">
                    <a-form-item label="编号" hidden>
                        <a-input v-decorator="[`id`]" disabled/>
                    </a-form-item>
                    <a-form-item label="题目内容">
                        <a-textarea
                                :auto-size="{ minRows: 1, maxRows: 4 }"
                                v-decorator="[`content`,{
                                                rules:[{
                                                    required:true,
                                                    message:'请输入题目内容'
                                                }]
                                            }]"
                                placeholder="请输入"
                        />
                    </a-form-item>
                    <a-form-item label="答案A">
                        <a-textarea
                                :auto-size="{ minRows: 1, maxRows: 4 }"
                                v-decorator="[`optionA`,{
                                                rules:[{
                                                    required:true,
                                                     message:'请输入选项A'
                                                }]
                                            }]"
                                placeholder="请输入"
                        />
                    </a-form-item>
                    <a-form-item label="答案B">
                        <a-textarea
                                :auto-size="{ minRows: 1, maxRows: 4 }"
                                v-decorator="[`optionB`,{
                                                rules:[{
                                                    required:true,
                                                     message:'请输入选项B'
                                                }]
                                            }]"
                                placeholder="请输入"
                        />
                    </a-form-item>
                    <a-form-item label="答案C">
                        <a-textarea
                                :auto-size="{ minRows: 1, maxRows: 4 }"
                                v-decorator="[`optionC`,{
                                            }]"
                                placeholder="请输入"
                        />
                    </a-form-item>
                    <a-form-item label="答案D">
                        <a-textarea
                                :auto-size="{ minRows: 1, maxRows: 4 }"
                                v-decorator="[`optionD`,{
                                            }]"
                                placeholder="请输入"
                        />
                    </a-form-item>
                    <a-form-item label="正确选项">
                        <a-select
                                placeholder="选择"
                                mode="multiple"
                                v-decorator="[`correct`,{
                                                rules:[{
                                                    required:true,
                                                     message:'请选择答案'
                                                }]
                                            }]"
                        >
                            <a-select-option key="A">A</a-select-option>
                            <a-select-option key="B">B</a-select-option>
                            <a-select-option key="C">C</a-select-option>
                            <a-select-option key="D">D</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </a-modal>
        </div>
    </div>
</template>

<script>
    import SysTitle from "@/components/system/model/SysTitle";
    import QuesAdd from "@/components/system/model/QuesAdd";
    import myAxios from "@/axios/myAxios";
    import moment from "moment";

    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            title: '编号',
            // width: 70,
        },
        {
            dataIndex: 'content',
            key: 'content',
            title: '题目',
        },
        {
            dataIndex: 'optionA',
            key: 'optionA',
            title: '选项A',
            // ellipsis: true,
            // scopedSlots: {customRender: 'photo'},
        },
        {
            dataIndex: 'optionB',
            key: 'optionB',
            title: '选项B',
            // ellipsis: true,
            // scopedSlots: {customRender: 'photo'},
        },
        {
            dataIndex: 'optionC',
            key: 'optionC',
            title: '选项C',
            // ellipsis: true,
            // scopedSlots: {customRender: 'photo'},
        },
        {
            dataIndex: 'optionD',
            key: 'optionD',
            title: '选项D',
            // ellipsis: true,
            // scopedSlots: {customRender: 'photo'},
        },
        {
            dataIndex: 'correct',
            key: 'correct',
            title: '正确选项',
            // ellipsis: true,
            // scopedSlots: {customRender: 'photo'},
        },
        {
            dataIndex: 'type',
            key: 'type',
            title: '题型',
            // ellipsis: true,
            scopedSlots: {customRender: 'type'},
        },
        {
            dataIndex: 'action',
            key: 'action',
            title: '操作',
            width: 105,
            // ellipsis: true,
            scopedSlots: {customRender: 'action'},
        },

    ];
    export default {
        name: "QuestionSys",
        components: {QuesAdd, SysTitle},
        data() {
            return {
                form: this.$form.createForm(this, {name: 'advanced_search'}),
                updateForm: this.$form.createForm(this, {name: 'update_form'}),
                data: [],
                columns,
                visible: false,
                confirmLoading: false,
                single: {},
                index: -1
            }
        },
        mounted() {
            const param = {
                id: null,
                type: null
            }
            this.getData(param);
        },
        methods: {
            deleteQuestion(record, index) {
                this.data.splice(index, 1)
                myAxios.get(`/sysQues/removeQuestion?id=${record.id}`)
            },
            cancel(e) {
                this.visible = false;
            },
            update(e) {
                const that = this;
                e.preventDefault();
                this.updateForm.validateFields((error, values) => {
                    if (!error) {

                        let correctArr = values.correct.sort();
                        let correct = "";
                        for (let item of correctArr) {
                            correct += item;
                        }
                        values.correct = correct
                        const form = {
                            id: values.id,
                            content: values.content,
                            optionA: values.optionA,
                            optionB: values.optionB,
                            optionC: values.optionC,
                            optionD: values.optionD,
                            correct: values.correct,
                            type: values.correct.length == 1 ? 0 : 1
                        }
                        this.$set(this.data, this.index, {
                            id: values.id,
                            content: values.content,
                            optionA: values.optionA,
                            optionB: values.optionB,
                            optionC: values.optionC,
                            optionD: values.optionD,
                            correct: values.correct,
                            type: values.correct.length == 1 ? 0 : 1
                        })
                        this.confirmLoading = true;
                        setTimeout(() => {
                            this.visible = false;
                            this.confirmLoading = false;
                            myAxios.post('/sysQues/saveOrUpdateQues', form)
                        }, 1000);
                        this.$message.success('修改成功');
                    }

                });
            },
            checkUpdate(record, index) {

                this.visible = true;
                this.index = index
                this.$nextTick(() => {
                    this.updateForm.setFieldsValue({
                        id: record.id,
                        content: record.content,
                        optionA: record.optionA,
                        optionB: record.optionB,
                        optionC: record.optionC,
                        optionD: record.optionD,
                        correct: record.correct,
                    })
                });
            },
            getData(param) {
                const that = this;
                myAxios.post(`/sysQues/listQuestion`, param)
                    .then(function (res) {

                        that.data = res.data
                    })
            },
            handleReset() {
                this.form.resetFields();
            },
            handleSearch(e) {
                const that = this;
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    const param = {
                        id: values.id,
                        type: values.type,
                    }
                    myAxios.post('/sysQues/listQuestion', param)
                        .then(function (res) {
                            that.data = res.data;
                        })
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