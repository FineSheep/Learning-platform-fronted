<template>
    <div>
        <sys-title title='用户管理'/>
        <div style="background-color:white;">
            <div id="components-form-demo-advanced-search">
                <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                    <a-row :gutter="24">
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
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="用户昵称">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`name`]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="用户邮箱">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`email`]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="用户性别">
                                <a-select
                                        style="width: 350px"
                                        v-decorator="[`gender`]"
                                        placeholder="请选择"
                                >
                                    <a-select-option value="0">
                                        男
                                    </a-select-option>
                                    <a-select-option value="1">
                                        女
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="用户手机">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`phone`]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="用户状态">
                                <a-select
                                        style="width: 350px"
                                        v-decorator="[`userStatus`]"
                                        placeholder="请选择"
                                >
                                    <a-select-option value="0">
                                        正常
                                    </a-select-option>
                                    <a-select-option value="1">
                                        封禁
                                    </a-select-option>
                                </a-select>
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
                    :data-source="dataList">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="avatarUrl" slot-scope="avatarUrl">
                    <a-avatar :src="avatarUrl"/>
                </span>
                <span slot="userRole" slot-scope="userRole">
                          <a-tag color="red" v-if="userRole">
                            管理员
                          </a-tag>
                            <a-tag color="green" v-else>
                            用户
                          </a-tag>
                </span>
                <span slot="userStatus" slot-scope="userStatus,record">
                    <a-switch checked-children="启用" un-checked-children="禁用" :checked="userStatus==0"
                              @click="change(record)"/>
                </span>
                <span slot="createTime" slot-scope="createTime">{{getTime(createTime)}}</span>
                <span slot="gender" slot-scope="gender">{{gender===0?'男':'女'}}</span>
                <span slot="action" slot-scope="action, record,index">
                  <a @click="vis(record,index)">修改</a>
                    <a-modal
                            title="修改信息"
                            :visible="visible"
                            :confirm-loading="confirmLoading"
                            @ok="handleOk(record)"
                            @cancel="handleCancel"
                    >
                    <a-form layout="horizontal">
                        <a-form-item
                                :label-col="{span:4}"
                                :wrapper-col="{span:14}"
                                label="编号">
                            <a-input disabled v-model="single.id"/>
                        </a-form-item>
                        <a-form-item
                                :label-col="{span:4}"
                                :wrapper-col="{span:14}"
                                label="昵称">
                            <a-input v-model="single.username"/>
                        </a-form-item>
                        <a-form-item
                                :label-col="{span:4}"
                                :wrapper-col="{span:14}"
                                label="邮箱">
                            <a-input disabled v-model="single.email"/>
                        </a-form-item>
                        <a-form-item
                                :label-col="{span:4}"
                                :wrapper-col="{span:14}"
                                label="简介">
                            <a-input type="textarea" v-model="single.profile"/>
                        </a-form-item>
                    </a-form>
                </a-modal>
                  <a-divider type="vertical"/>
                     <a-popconfirm
                             title="确认删除吗？"
                             ok-text="Yes"
                             cancel-text="No"
                             @confirm="deleteUser(record,index)"
                     >
                         <a style="color: red">删除</a>
                     </a-popconfirm>

                </span>
            </a-table>
        </div>

    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    import SysTitle from "@/components/system/model/SysTitle";
    import moment from 'moment'

    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            title: '编号',
            ellipsis: true
        },
        {
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            title: '头像',
            scopedSlots: {customRender: 'avatarUrl'},
            ellipsis: true
        },
        {
            dataIndex: 'userRole',
            key: 'userRole',
            title: '角色',
            scopedSlots: {customRender: 'userRole'},
            ellipsis: true
        },
        {
            dataIndex: 'username',
            key: 'username',
            title: "昵称",
            ellipsis: true
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            scopedSlots: {customRender: 'gender'},
            ellipsis: true
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true
        },

        {
            title: '电话',
            key: 'phone',
            dataIndex: 'phone',
            ellipsis: true
        },
        {
            title: '简介',
            key: 'profile',
            dataIndex: 'profile',
            ellipsis: true
        },
        {
            title: '状态',
            dataIndex: 'userStatus',
            key: 'userStatus',
            scopedSlots: {customRender: 'userStatus'},
            ellipsis: true

        },
        {
            title: '注册时间',
            key: 'createTime',
            dataIndex: 'createTime',
            scopedSlots: {customRender: 'createTime'},
            ellipsis: true
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
            ellipsis: true
        },
    ];
    export default {
        name: "UserSys",
        components: {SysTitle},
        mounted() {
            this.getData()
        },
        data() {
            return {
                expand: false,
                form: this.$form.createForm(this, {name: 'advanced_search'}),
                dataList: [],
                columns,
                visible: false,
                confirmLoading: false,
                single: {},
                index: -1
            }
        },
        methods: {
            getData() {
                const that = this;
                const form = {
                    'userId': null,
                    'gender': null,
                    'name': null,
                    'phone': null,
                    'email': null,
                    'userStatus': null,
                }
                myAxios.post('/sysUser/listSysUser', form)
                    .then(function (res) {
                        that.dataList = res.data;
                    })
            },
            vis(record, index) {
                this.visible = true;
                this.single = {...record};
                this.index = index
            },
            handleOk(record) {
                const that = this;
                this.confirmLoading = true;
                this.$set(this.dataList, this.index, this.single)
                setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading = false;
                    this.$message.success('修改成功');
                    myAxios.post('/sysUser/updateUser', this.single)
                }, 1000);
            },
            handleCancel(e) {
                this.visible = false;
            },
            deleteUser(record,index) {
                // const index = this.dataList.map(item => item).indexOf(record);
                this.dataList.splice(index, 1)
                myAxios.get(`/sysUser/removeUser?userId=${record.id}`)
            },
            change(record) {
                record.userStatus = record.userStatus == 0 ? 1 : 0;
                myAxios.get(`/sysUser/forbiddenUser?userId=${record.id}&status=${record.userStatus}`)
            },
            getTime(time) {
                return moment(time).format('YYYY-MM-DD')
            },
            handleReset() {
                this.form.resetFields();
            },
            handleSearch(e) {
                const that = this;
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    console.log('error', error);
                    console.log('Received values of form: ', values);
                    const form = {
                        'userId': values.userId,
                        'gender': values.gender,
                        'name': values.name,
                        'phone': values.phone,
                        'email': values.email,
                        'userStatus': values.userStatus,
                    }
                    myAxios.post('/sysUser/listSysUser', form)
                        .then(function (res) {
                            that.dataList = res.data;
                        })
                });
            },
        },
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