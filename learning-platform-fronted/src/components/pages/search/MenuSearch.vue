<template>
    <div>
        <div>
            <div class="logo"/>
            <a-menu v-model="current" mode="horizontal" class="ant-menu">
                <a-menu-item key="index" @click="menuSearch($event,7)">
                    首页
                </a-menu-item>
                <a-menu-item key="practice" @click="menuSearch">
                    练习
                </a-menu-item>
                <a-menu-item key="news" @click="menuSearch">
                    资讯
                </a-menu-item>
                <a-menu-item key="feedBack" @click="menuSearch">
                    反馈
                </a-menu-item>
                <a-menu-item style="flex: 1;border: none"></a-menu-item>
                <a-menu-item disabled>
                    <div class="bottom">
                        <a-input-search placeholder="input search text" enter-button @search="onSearch"/>
                    </div>
                </a-menu-item>
                <a-menu-item key="mail">
                    <div class="bottom">
                        <a-badge :count="count">
                            <a-icon type="mail" :style="{ fontSize: '25px'}"/>
                        </a-badge>
                    </div>

                </a-menu-item>
                <a-menu-item key="edit">
                    <div class="bottom">
                        <a-icon type="edit" :style="{ fontSize: '25px'}"/>
                    </div>
                </a-menu-item>
                <a-menu-item>
                    <a-dropdown>
                        <a-avatar :src="src"
                                  @click="e => e.preventDefault()"
                        />
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a-icon type="user"/>
                                个人中心
                            </a-menu-item>
                            <a-menu-item>
                                <a-icon type="poweroff"/>
                                退出登录
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>

                </a-menu-item>
            </a-menu>
        </div>

    </div>
</template>


<script>

    export default {
        name: "MenuSearch",
        data() {
            return {
                current: [],
                isLogin: true,
                count: 5,
                src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
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
            },
            onSearch(value) {
                console.log(value);
            },
            menuSearch(e, key) {
                console.log('click', key);
            }
        }

    };
</script>


<style>
    .logo {
        width: 200px;
        height: 40px;
        background: url("../../../../public/logo.svg");
        margin-top: 10px;
        margin-right: 28px;
        float: left;
    }

    .ant-menu {
        display: flex;
    }

    .bottom {
        margin-top: 10px;
        display: flex;
        align-content: center
    }

</style>