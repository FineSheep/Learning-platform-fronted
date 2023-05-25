<template>
    <div>
        <div id="logo" class="logo" @click="toPage"/>
        <a-menu mode="horizontal"
                class="ant-menu"
                @click="menuSearch">
            <a-menu-item key="">
                <a-icon type="bank"/>
                首页
            </a-menu-item>
            <a-menu-item key="index">
                <a-icon type="fork"/>
                博文游览
            </a-menu-item>
            <a-menu-item key="practiceIndex">
                <a-icon type="radar-chart"/>
                答题冲刺
            </a-menu-item>
            <a-menu-item key="news">
                <a-icon type="sliders"/>
                在线资讯
            </a-menu-item>

            <a-menu-item key="mail" style="border: none">
                <div>
                    <a-badge :dot="show">
                        <a-icon type="mail"/>
                    </a-badge>
                    消息中心
                </div>

            </a-menu-item>
            <a-menu-item key="content" style="border: none">
                <div>
                    <a-icon type="edit"/>
                    内容创作
                </div>
            </a-menu-item>
            <a-menu-item style="flex: 1;border: none" key="none"/>
            <a-menu-item style="border: none" key="none-1">
                <concat/>
            </a-menu-item>
            <a-menu-item style="border: none" key="personCenter">
                <a-dropdown v-if="isLogin">
                    <a-avatar :src="user.avatarUrl"
                              @click="e => e.preventDefault()"
                    />
                    <a-menu slot="overlay">
                        <a-menu-item @click="toPersonCenter">
                            <a-icon type="user"/>
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
    import concat from "@/components/concat"
    import userJs from "@/userJs/user"
    import myAxios from "@/axios/myAxios";
    import sys from '@/assets/system/system.svg'

    export default {
        name: "MenuSearch",
        components: {
            concat
        },
        async mounted() {
            const user = await userJs.getCurrentUser();

            if (user == null) {
                this.isLogin = false;
            } else {
                this.isLogin = true;
                this.user = user;
            }
            this.dotMessage();
        },
        data() {
            return {
                isLogin: false,
                show: false,
                user: {},
                sys
            };
        },

        methods: {
            toPage() {
                this.$router.push(`/`)
            },
            toPersonCenter() {
                this.$router.push(`/personCenter`)
            },
            offLogin() {
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
                this.isLogin = false;
                this.$router.push("/");
            },
            toLogin() {
                this.$router.push("/LoginRegister")
            },
            menuSearch(e) {
                if (e.key != 'personCenter' && e.key != 'none' && e.key != 'none-1') {
                    this.$router.push(`/${e.key}`)
                }
            },
            dotMessage() {
                const that = this;
                myAxios.get('/message/dotMessage')
                    .then(function (res) {
                        if (res.data != 0) {
                            that.show = true;
                        }
                    })
            }
        }

    };
</script>


<style scoped>
    .sys-img {
        height: 15px;
        width: 15px;
    }

    .logo {
        width: 200px;
        height: 40px;
        background: url("../../../public/logo.svg");
        /*background-color: skyblue;*/
        margin-top: 5px;
        margin-right: 20px;
        float: left;
        display: inline-block;
    }

    #logo{
        cursor: pointer;
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