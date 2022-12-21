<template>
    <div class="container">

        <div class="login-contain">
            <img src="../../assets/logo2.svg"/>
            <a-form
                    id="components-form-demo-normal-login"
                    :form="form"
                    class="login-form"
                    @submit="handleSubmit"
            >
                <a-form-item>
                    <a-input
                            v-decorator="[
          'email',
          { rules: [{ type:'email',required: true, message: '请输入正确邮箱!' }] },
        ]"
                            placeholder="请输入登录邮箱"
                    >
                        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                            v-decorator="[
          'password',
          { rules: [{ min:6,max:10,required: true, message: '密码长度6到10位！' }] },
        ]"
                            type="password"
                            placeholder="请输入登录密码"
                    >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-checkbox
                            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
                    >
                        记住我
                    </a-checkbox>
                    <a class="login-form-forgot" href="">
                        忘记密码
                    </a>
                    <a-button type="primary" html-type="submit" class="login-form-button">
                        登录
                    </a-button>
                    Or
                    <a href="">
                        注册一个吧！
                    </a>
                </a-form-item>
            </a-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "UserLogin",
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {

                        console.log('Received values of form: ', values);
                        this.$router.push("/");
                    }
                });
            },
        },
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url("../../../public/background2.png");
        /*background-image: url("@/assets/background2.png");*/

    }

    .login-contain {
        width: 20%;
        height: 20%;
        margin: 5% auto;
    }

    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }

    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }

    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>