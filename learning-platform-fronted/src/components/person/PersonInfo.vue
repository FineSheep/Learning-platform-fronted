<template>
    <div>
        <a-layout-content style="padding: 0 50px">
            <a-layout style="padding: 24px 0; background: #fff">
                <a-layout-sider width="60%" style="background: white">
                    <div>
                        <div class="info-font">个人资料</div>
                        <a-divider/>
                        <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
                                @submit="handleSubmit">
                            <a-form-item label="昵称">
                                <a-input
                                        v-decorator="['username', { rules: [{ required: true, message: '请输入昵称!' }] }]"
                                />
                            </a-form-item>
                            <a-form-item label="手机号">
                                <a-input
                                        v-decorator="['phone', { rules: [
                                { required: false, message: '请输入昵称!' },
                                { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!'}
                                ] }]"
                                        placeholder="请输入手机号码"
                                />
                            </a-form-item>
                            <a-form-item label="性别">
                                <a-radio-group v-decorator="['gender']">
                                    <a-radio :value="0">
                                        男
                                    </a-radio>
                                    <a-radio :value="1">
                                        女
                                    </a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item label="生日">
                                <a-date-picker v-decorator="['birthday']" @change="birthday"/>
                            </a-form-item>
                            <a-form-item label="简介">
                                <a-textarea
                                        v-decorator="['profile', { rules: [] }]"
                                        placeholder="请输入个人简介"
                                        :auto-size="{ minRows: 3, maxRows: 5 }"
                                />
                            </a-form-item>
                            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                                <a-button type="primary" html-type="submit">
                                    提交
                                </a-button>
                            </a-form-item>
                        </a-form>
                    </div>

                </a-layout-sider>
                <a-layout-sider width="40%" style="background: white">
                    <a-upload
                            name="avatar"
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            :before-upload="beforeUpload"
                            style="margin-top: 20%; margin-left: 50%"
                            :customRequest="upload"
                    >
                        <a-avatar :size="100" icon="user" :src="user.avatarUrl" alt="avatar"/>
                    </a-upload>
                </a-layout-sider>
            </a-layout>
        </a-layout-content>
    </div>
</template>

<script>
    import userJs from "@/userJs/user"
    import myAxios from "@/axios/myAxios";
    import moment from 'moment'

    export default {
        name: "PersonInfo",
        data() {
            return {
                user: {
                    avatarUrl: ''
                },
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'}),
            }
        },
        async mounted() {
            const user = await userJs.getCurrentUser();
            this.user = user;
            console.log(user)
            this.form.setFieldsValue({
                username: user.username,
                phone: user.phone,
                profile: user.profile,
                gender: user.gender,
                birthday: moment(user.birthday,'YYYY-MM-DD')
            })
        },
        methods: {
            birthday(date, dateString) {
                console.log(date, dateString);
            },
            async upload(file) {
                const form = new FormData()
                const userId = Number(localStorage.getItem("userId"))
                form.append('file', file.file)
                form.append('userId', userId)
                // console.log(form)
                const res = await myAxios.post('/img/personUrl',
                    form,
                    {
                        headers: {'Content-Type': 'multipart/form-data'},
                    })
                if (res.code == 0) {
                    console.log(res.data)
                    // 调用组件内方法, 设置为成功状态
                    file.onSuccess(res, file.file);
                    file.status = 'done';
                    this.user.avatarUrl = res.data.url;
                    this.$message.success("上传成功")
                } else {
                    file.onError()
                    file.status = 'error'
                }
            },

            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('只能上传jpg文件');
                }
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                    this.$message.error('图片大小不能超过5MB!');
                }
                return isJpgOrPng && isLt5M;
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let user = {...values, userId: localStorage.getItem('userId')}
                        myAxios.post('/user/updateUserInfo', user)
                        this.$message.success("修改成功")
                    }
                });
            },
        },
    }
</script>

<style scoped>
    .info-font {
        font-weight: 600;
        font-size: 20px;
        line-height: 18px;
        color: #333;
        margin-bottom: 20px;
    }

    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }

    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }

</style>