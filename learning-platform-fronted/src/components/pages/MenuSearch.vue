<template>
    <div style="position: relative">
        <div>
            <div class="logo"/>
            <a-menu v-model="current" mode="horizontal">
                <a-menu-item key="index">
                    首页
                </a-menu-item>
                <a-menu-item key="practice">
                    练习
                </a-menu-item>
                <a-menu-item key="news">
                    资讯
                </a-menu-item>
            </a-menu>
        </div>
        <ul class="right">
            <template v-if="isLogin">
                <a-popover>
                    <template slot="content">
                        <p>
                            <a-icon type="user"/>
                            <span style="margin-left: 5px" @click="person">个人</span></p>
                        <p>
                            <a-icon type="poweroff"/>
                            <span style="margin-left: 5px" @click="quick">退出</span></p>
                    </template>
                    <li class="head-li">
                        <a-avatar icon="user"/>
                    </li>
                </a-popover>
            </template>
            <template v-else>
                <a-button type="primary" @click="userLogin">登录 | 注册</a-button>
            </template>

        </ul>
    </div>
</template>


<script>
    export default {
        name: "MenuSearch",
        data() {
            return {
                current: [],
                isLogin: true
            };
        },
        methods: {
            person() {

            },
            quick() {
                this.$router.push("/login")
            },
            userLogin() {
                this.$router.push("/login")
            }
        }

    };
</script>


<style scoped>
    .logo {
        width: 100px;
        height: 40px;
        background: url("../../../public/logo.svg");
        margin-right: 28px;
        float: left;
    }

    .right {
        position: absolute;
        right: 30px;
        top: -10px;
    }

    .head-li {
        list-style: none;
        display: inline-block;
        margin-left: 20px
    }

    p:hover {
        cursor: pointer;
    }
</style>