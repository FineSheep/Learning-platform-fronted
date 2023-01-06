<template>
        <div>
            <div class="logo"/>
            <a-menu mode="horizontal" class="ant-menu"
                    @click="menuSearch">
                <a-menu-item key="">
                    首页
                </a-menu-item>
                <a-menu-item key="practice">
                    练习
                </a-menu-item>
                <a-menu-item key="news">
                    资讯
                </a-menu-item>
                <a-menu-item key="feedBack">
                    反馈
                </a-menu-item>
                <a-menu-item style="flex: 1;border: none"/>
                <a-menu-item disabled>
                    <div class="bottom">
                        <a-input-search placeholder="input search text" enter-button @search="onSearch"/>
                    </div>
                </a-menu-item>
                <a-menu-item key="mail" style="border: none">
                    <div>
                        <a-badge :dot="show">
                            <a-icon type="mail"/>
                        </a-badge>
                        消息
                    </div>

                </a-menu-item>
                <a-menu-item key="edit" style="border: none">
                    <div>
                        <a-icon type="edit"/>
                        发布
                    </div>
                </a-menu-item>
                <a-menu-item style="border: none" key="personCenter">
                    <a-dropdown v-if="isLogin">
                        <a-avatar :src="user.avatarUrl"
                                  @click="e => e.preventDefault()"
                        />
                        <a-menu slot="overlay">
                            <a-menu-item @click="toPersonCenter">
                                <a-icon type="user" />
                                个人中心
                            </a-menu-item>
                            <a-menu-item @click="offLogin">
                                <a-icon type="poweroff"/>
                                退出登录
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <a-button v-else @click="toLogin" type="primary">登录 | 注册
                    </a-button>
                </a-menu-item>
            </a-menu>
        </div>
</template>


<script>

    import userJs from "@/userJs/user"

    export default {
        name: "MenuSearch",
        async mounted() {
            const user = await userJs.getCurrentUser();
            if (user == null) {
                this.isLogin = false;
            } else {
                this.isLogin = true;
                this.user = user;
            }

        },
        data() {
            return {
                isLogin: false,
                show: true,
                user: {}
            };
        },
        methods: {
            toPersonCenter(){
                this.$router.push(`/personCenter`)

            },
            offLogin() {
                localStorage.removeItem("userId");
                this.isLogin = false;
            },
            toLogin() {
                this.$router.push("/LoginRegister")
            },

            onSearch(value) {
                console.log(value);
            },
            menuSearch(e) {
                if (e.key != 'personCenter') {
                    this.$router.push(`/${e.key}`)
                }
            }
        }

    };
</script>


<style scoped>
    .logo {
        width: 200px;
        height: 40px;
        background: url("../../../../public/logo.svg");
        /*background-color: skyblue;*/
        margin-top: 5px;
        margin-right: 20px;
        float: left;
        display: inline-block;
    }

    .ant-menu {
        display: flex;
    }

    .bottom {
        margin-top: 8px;
        display: flex;
        align-content: center
    }

</style>