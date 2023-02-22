<template>
    <div>
        <div>
            <div class="info-font">密码修改</div>
            <a-divider/>
            <div style="width: 70%">
                <a-form>
                <a-form-item
                        label="请输入验证码"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                >
                    <a-space>
                        <a-input placeholder="请输入验证码"
                                 type="email"
                                 v-model="form.code"
                        />
                        <vue-get-code :getCode="getCode"/>
                    </a-space>

                </a-form-item>
                <a-form-item
                        label="请输入密码"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                >
                    <a-input placeholder="请输入密码"
                             type="password"
                             v-model="form.onePass"
                    />
                </a-form-item>
                <a-form-item
                        label="再次输入密码"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"

                >
                    <a-input placeholder="再次输入密码" type="password" v-model="form.twoPass"/>
                </a-form-item>
                <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
                    <a-button type="primary" @click="handle">
                        Submit
                    </a-button>
                </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    import VueGetCode from 'vue-get-code'

    export default {
        name: "AccountSetting",
        components: {
            VueGetCode
        },
        data() {
            return {
                formLayout: 'horizontal',
                form: {
                    code: '',
                    onePass: '',
                    twoPass: ''
                }
            };
        },
        computed: {
            formItemLayout() {
                return {
                    labelCol: {span: 4},
                    wrapperCol: {span: 14},
                }
            },
            buttonItemLayout() {
                return {
                    wrapperCol: {span: 14, offset: 4},
                }
            },
        },
        methods: {
            getCode() {
                const that = this;
                myAxios.get(`user/getCodeById`).then(function (res) {
                    console.log(res)
                    if (res.code === 0) {
                        that.$message.success(res.data)
                    } else {
                        that.$message.error(res.description)
                    }
                })
            },
            handle() {
                const len = this.form.onePass.length;
                const onePass = this.form.onePass;
                const twoPass = this.form.twoPass;
                const code = this.form.code;
                if (len > 10 || len < 6) {
                    this.$message.error("密码长度6到10位！")
                    return
                }
                if (onePass === twoPass) {
                    this.$message.success("修改成功，请重新登录")
                    myAxios.post('/user/updatePassword', {
                        onePass, twoPass, code,
                    })
                    return
                } else {
                    this.$message.error("两次密码不一致")
                    return
                }
            }

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

    .vue-get-code {
        color: #1092ed;
        cursor: pointer;
        width: 100px;
    }

    .vue-get-code.enable-countdown {
        cursor: not-allowed;
    }
</style>