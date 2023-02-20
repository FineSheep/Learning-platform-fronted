<template>
    <div class="container">
        <div class="login-contain">
            <img src="../../assets/logo2.svg"/>
            <a-card
                    class="login-card"
                    :tab-list="tabListNoTitle"
                    :active-tab-key="noTitleKey"
                    @tabChange="key => onTabChange(key, 'noTitleKey')"
            >
                <p v-if="noTitleKey === 'password'">
                    <a-form
                            :form="form"
                            class="login-form"
                            @submit="loginByPassword"
                    >
                        <a-form-item>
                            <a-input
                                    v-decorator="[
                                  'emailByPass',
                                  { rules: [{ type:'email',required: true, message: '请输入正确邮箱!' }] },
                                ]"
                                    placeholder="请输入邮箱"
                            >
                                <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input
                                    v-decorator="[
                                    'passwordByPass',
                                    { rules:
                                        [
                                            { min:6,
                                            max:10,
                                            required: true,
                                            message: '密码长度6到10位！'
                                            }
                                        ]
                                        },
                                                ]"
                                    type="password"
                                    placeholder="请输入密码"
                            >
                                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                                登录
                            </a-button>
                        </a-form-item>
                    </a-form>
                </p>
                <p v-else-if="noTitleKey === 'code'">
                    <a-form
                            :form="form"
                            class="login-form"
                            @submit="loginOrRegister"
                    >
                        <a-form-item>
                            <a-input
                                    v-decorator="[
          'emailByCode',
          { rules: [{ type:'email',required: true, message: '请输入正确邮箱!' }] },
        ]"
                                    placeholder="请输入邮箱"
                                    autocomplete
                            >
                                <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-space>
                                <a-input
                                        v-decorator="['codeByCode',]"
                                        type="text"
                                        placeholder="请输入验证码"
                                        style="padding: 5px"
                                >
                                </a-input>
                                <vue-get-code :getCode="getCode"/>
                            </a-space>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                                登录 | 注册
                            </a-button>
                        </a-form-item>
                    </a-form>
                </p>
            </a-card>
        </div>

    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    import VueGetCode from 'vue-get-code'

    export default {
        name: 'LoginRegister',
        components: {
            VueGetCode
        },
        data() {
            return {
                tabListNoTitle: [
                    {
                        key: 'code',
                        tab: '验证码登录',
                    },
                    {
                        key: 'password',
                        tab: '密码登录',
                    },
                ],
                noTitleKey: 'code',
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },
        methods: {
            onTabChange(key, type) {
                // console.log(key, type);
                this[type] = key;
            },
            loginByPassword(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        const that = this;
                        myAxios.post('user/loginByPassword', {
                            'email': values.emailByPass,
                            'password': values.passwordByPass
                        }).then(function (res) {
                            console.log(res)
                            if (res.code == 0) {
                                localStorage.setItem("userId", JSON.stringify(res.data.id));
                                that.$router.push("/");
                                that.$message.success(`欢迎登录，${res.data.username}`);
                            } else {
                                that.$message.error("用户名或密码错误，请重试！");
                            }


                        })
                    }
                });
            },
            loginOrRegister(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(values)
                    if (!err) {
                        const that = this;
                        myAxios.post('user/loginOrRegister', {
                            'email': values.emailByCode,
                            'code': values.codeByCode
                        }).then(function (res) {
                            console.log(res)
                            if (res.code === 0) {
                                console.log("------------------")
                                localStorage.setItem("userId", JSON.stringify(res.data.id));
                                that.$router.push("/");
                                that.$message.success(`欢迎登录，${res.data.username}`);
                            } else {
                                that.$message.error(res.description)
                            }
                        })
                    }
                });
            },
            getCode() {
                this.form.validateFields((err, values) => {
                    console.log(values)
                    if (!err) {
                        const that = this;
                        myAxios.get(`user/getCode?email=${values.emailByCode}`).then(function (res) {
                            console.log(res)
                            if (res.code === 0) {
                                that.$message.success(res.data)
                            } else {
                                that.$message.error(res.description)
                            }
                        })
                    }
                });

            }

        },
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url("../../../public/background2.png");
        background-size: 100%, 100%;
    }

    .login-contain {
        width: 20%;
        height: 20%;
        margin: 5% auto;
    }

    .login-card {
        width: 100%;
        background-color: transparent;
        border: none;
        text-align: center
    }

    .login-form-button {
        width: 100%;
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
