<template>
    <div>
        <sys-title title="帖子管理"/>
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
                            <a-form-item label="简介">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`description`]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="标签">
                                <a-select
                                        style="width: 350px"
                                        placeholder="请选择标签"
                                        v-decorator="['tag']"
                                >
                                    <a-select-option v-for="item in tags" :key="item.id">
                                        {{item.tagName}}
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
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="用户姓名">
                                <a-input
                                        style="width: 350px"
                                        v-decorator="[`username`]"
                                        placeholder="请输入"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                                :span="8"
                        >
                            <a-form-item label="审核">
                                <a-select
                                        style="width: 350px"
                                        placeholder="请选择标签"
                                        v-decorator="['state']"
                                >
                                    <a-select-option key="0">
                                        待审核
                                    </a-select-option>
                                    <a-select-option key="1">
                                        通过
                                    </a-select-option>
                                    <a-select-option key="2">
                                        拒绝
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12" style="text-align: left">
                            <a-button type="primary" @click="write">
                                <a-icon type="plus"/>
                                增加
                            </a-button>
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
                <a slot="photo" slot-scope="photo">
                    <img :src="photo">
                </a>
                <span slot="createTime" slot-scope="createTime">
                    {{getTime(createTime)}}
                </span>
                <span slot="reviewStatus" slot-scope="reviewStatus">
                    <a-tag v-if="reviewStatus==0" color="blue">待审核</a-tag>
                    <a-tag v-if="reviewStatus==1" color="green">通过</a-tag>
                    <a-tag v-if="reviewStatus==2" color="red">拒绝</a-tag>
                </span>
                <span slot="action" slot-scope="action,record,index">
                    <a @click="watchPost(record.id)">查看</a>
                     <a-divider type="vertical"/>
                    <a @click="check(record,index)">审核</a>
                        <a-modal
                                title="审核信息"
                                :visible="visible"
                                :confirm-loading="confirmLoading"
                                @ok="handleOk"
                                @cancel="handleCancel"
                        >
                     <a-form layout="horizontal" :label-col="{span:4}" :wrapper-col="{span:14}">
                        <a-form-item
                                label="编号">
                            <a-input v-model="single.id" disabled/>
                        </a-form-item>
                        <a-form-item
                                label="标题">
                            <a-input v-model="single.title" disabled/>
                        </a-form-item>
                         <a-form-item
                                 label="详细信息">
                            <a @click="watchPost(single.id)">点击跳转</a>
                        </a-form-item>
                         <a-form-item
                                 label="审核">
                            <a-select :default-value="reviewStatus[single.reviewStatus]" @change="selectChange">
                                <a-select-option key="0">待审核</a-select-option>
                                <a-select-option key="1">通过</a-select-option>
                                <a-select-option key="2">拒绝</a-select-option>
                            </a-select>
                        </a-form-item>
                         <a-form-item
                                 label="审核信息">
                             <a-textarea v-model="single.reviewMessage"></a-textarea>
                         </a-form-item>
                    </a-form>
                     </a-modal>
                </span>
                <span slot="tagsName" slot-scope="tagsName">
                        <a-tag v-for="item in tagsName" :key="item">{{item}}</a-tag>
                </span>
            </a-table>
        </div>
    </div>
</template>

<script>
    import SysTitle from "@/components/system/model/SysTitle";
    import myAxios from "@/axios/myAxios";
    import moment from "moment";

    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            title: '编号',
            width: 70,
        },
        {
            dataIndex: 'title',
            key: 'title',
            title: '标题',
            ellipsis: true
        },
        {
            dataIndex: 'photo',
            key: 'photo',
            title: '封面',
            ellipsis: true,
            scopedSlots: {customRender: 'photo'},
        },
        {
            dataIndex: 'user.id',
            key: 'userId',
            title: '用户编号',
            ellipsis: true,
        },
        {
            dataIndex: 'user.username',
            key: 'username',
            title: '用户昵称',
            ellipsis: true,
        },
        {
            dataIndex: 'reviewStatus',
            key: 'reviewStatus',
            title: '状态',
            ellipsis: true,
            width: 100,
            scopedSlots: {customRender: 'reviewStatus'},
        },
        {
            dataIndex: 'reviewMessage',
            key: 'reviewMessage',
            title: '审核信息',

            ellipsis: true,
        },
        {
            dataIndex: 'thumbNum',
            key: 'thumbNum',
            title: '点赞',
            width: 70,
            ellipsis: true,
        },
        {
            dataIndex: 'collectNum',
            key: 'collectNum',
            title: '收藏',
            width: 70,
            ellipsis: true,
        },

        {
            dataIndex: 'tagsName',
            key: 'tagsName',
            title: '标签',
            // width:100,
            scopedSlots: {customRender: 'tagsName'},
        },
        {
            dataIndex: 'createTime',
            key: 'createTime',
            title: '发布时间',
            scopedSlots: {customRender: 'createTime'},
        },
        {
            dataIndex: 'action',
            key: 'action',
            title: '操作',
            scopedSlots: {customRender: 'action'},
        },

    ];
    export default {
        name: "PostSys",
        components: {SysTitle},
        data() {
            return {
                form: this.$form.createForm(this, {name: 'advanced_search'}),
                data: [],
                tags: [],
                reviewStatus: ['待审核', '通过', '拒绝'],
                columns,
                visible: false,
                confirmLoading: false,
                index: -1,
                single: {}
            }
        },

        mounted() {
            this.getTags()
            this.getData()
        },

        methods: {
            write() {
                const route = this.$router.resolve({
                    path: '/writeArticle',
                })
                window.open(route.href, '_blank');//打开新的窗口
            },
            selectChange(value) {
                // console.log(value)
                this.single.reviewStatus = value
            },
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                const that = this;
                if (this.single.reviewMessage == null | this.single.reviewMessage.length == 0) {
                    this.$message.warning('审核信息不能为空');
                    return;
                }
                this.confirmLoading = true;
                setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading = false;
                    this.$set(this.data, this.index, this.single)
                    myAxios.post(`/sysPost/checkPost`, {
                        postId: that.single.id,
                        reviewStatus: that.single.reviewStatus,
                        reviewMessage: that.single.reviewMessage,
                    }).then(function (res) {
                        that.$message.success('操作成功');
                    })
                }, 1000);
            },
            handleCancel(e) {
                this.visible = false;
            },
            watchPost(id) {
                const route = this.$router.resolve({
                    path: '/post',
                    query: {
                        postId: id
                    }
                })
                window.open(route.href, '_blank');//打开新的窗口
            },
            check(record, index) {
                this.index = index;
                this.visible = true;
                this.single = record
            },
            getTime(time) {
                return moment(time).format('YYYY-MM-DD')
            },
            getData() {
                const that = this;
                const form = {
                    id: null,
                    title: null,
                    description: null,
                    tag: null,
                    userId: null,
                    username: null,
                    state: null
                }
                myAxios.post('/sysPost/listPost', form)
                    .then(function (res) {
                        that.data = res.data
                    })
            },
            getTags() {
                const that = this;
                myAxios.get('/tag/getTags')
                    .then(function (res) {
                        that.tags = res.data
                    })
            },
            handleReset() {
                this.form.resetFields();
            },
            handleSearch(e) {
                const that = this;
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    const form = {
                        id: values.id,
                        title: values.title,
                        description: values.description,
                        tag: values.tag,
                        userId: values.userId,
                        username: values.username,
                        state: values.state
                    }
                    myAxios.post('/sysPost/listPost', form)
                        .then(function (res) {
                            that.data = res.data;
                        })
                });
            },
        }
    }
</script>

<style scoped>
    img {
        width: 80px;
        height: 50px;
    }

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