<template>
    <div>
        <sys-title title="资讯管理"/>
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
                                        v-decorator="[`id`]"
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
                            <a-form-item label="类型">
                                <a-select
                                        style="width: 350px"
                                        v-decorator="[`type`]"
                                        placeholder="请选择"
                                >
                                    <a-select-option value="0">
                                        启用
                                    </a-select-option>
                                    <a-select-option value="1">
                                        禁用
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="来源">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`source`]"
                                        placeholder="请选择"
                                />

                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="开始">
                                <a-date-picker
                                        :locale="locale"
                                        style="width: 350px"
                                        v-decorator="[`startTime`]"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="结束">
                                <a-date-picker
                                        :locale="locale"
                                        style="width: 350px"
                                        v-decorator="[`endTime`]"/>
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
                <span slot="content" slot-scope="content,record">
                    <a @click="detail(record)">点击跳转详细内容</a>
                </span>
                <span slot="link" slot-scope="link,record">
                    <a :href="link">点击跳转原网页</a>
                </span>
                <span slot-scope="type,record" slot="type">
                <a-switch checked-children="启用" un-checked-children="禁用"
                          :checked="type==0"
                          @click="change(record)"/>
                </span>
            </a-table>
        </div>
    </div>
</template>

<script>
    import SysTitle from "@/components/system/model/SysTitle";
    import myAxios from "@/axios/myAxios";
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            title: '编号',
            width: 80
        },
        {
            dataIndex: 'title',
            key: 'title',
            title: "标题",
            width: 400
        },
        {
            dataIndex: 'source',
            key: 'source',
            title: '来源',
        },
        {
            dataIndex: 'content',
            title: '内容',
            key: 'content',
            ellipsis: true,
            scopedSlots: {customRender: 'content'},
        },
        {
            title: '链接',
            dataIndex: 'link',
            key: 'link',
            scopedSlots: {customRender: 'link'},
        },
        {
            dataIndex: 'putTime',
            title: '发布时间',
            key: 'putTime',
            scopedSlots: {customRender: 'putTime'},
        },
        {
            dataIndex: 'type',
            title: '操作',
            key: 'type',
            scopedSlots: {customRender: 'type'},
        },

    ];
    export default {
        name: "SysInformation",
        components: {SysTitle},
        data() {
            return {
                form: this.$form.createForm(this, {name: 'advanced_search'}),
                locale,
                columns,
                data: []
            }
        },
        mounted() {
            const param = {
                id: undefined,
                title: undefined,
                type: undefined,
                startTime: undefined,
                endTime: undefined,
                source: undefined
            }
            this.fetchData(param)
        },
        methods: {
            change(record){
                record.type = record.type == 0 ? 1 : 0;
                myAxios.get(`/sysInfo/changeInfo?id=${record.id}&type=${record.type}`)
            },
            detail(record) {
                this.$router.push(`/postNews?postId=${record.id}`)
            },
            fetchData(param) {
                const that = this;
                myAxios.post('/sysInfo/listInfo', param)
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
                    this.fetchData(values)
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