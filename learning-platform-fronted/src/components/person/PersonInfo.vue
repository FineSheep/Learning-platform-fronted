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
                            <a-form-item label="简介">
                                <a-textarea
                                        v-decorator="['profile', { rules: [] }]"
                                        placeholder="请输入个人简介"
                                        :auto-size="{ minRows: 3, maxRows: 5 }"
                                />
                            </a-form-item>
                            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                                <a-button type="primary" html-type="submit">
                                    Submit
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
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :before-upload="beforeUpload"
                            @change="handleChange"
                            style="margin-top: 20%; margin-left: 50%"
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

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    export default {
        name: "PersonInfo",
        data() {
            return {
                user: {
                    avatarUrl: ''
                },
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                loading: false,
                imageUrl: '',
            }
        },
        async mounted() {
            const user = await userJs.getCurrentUser();
            this.user = user;
            console.log(user);
            this.form.setFieldsValue({
                username: user.username,
                phone: user.phone,
                profile: user.profile,
                gender: user.gender
            })
        },
        methods: {
            handleChange(info) {
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    getBase64(info.file.originFileObj, imageUrl => {
                        this.imageUrl = imageUrl;
                        this.loading = false;
                    });
                }
            },
            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!');
                }
                return isJpgOrPng && isLt2M;
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
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