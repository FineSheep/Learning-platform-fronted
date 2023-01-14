<template>
    <div style="background-color:white;">
        <div style="margin: 0 auto;width: 70%; padding-top: 20px">
            <a-button type="primary" block @click="article"> 写文章</a-button>
        </div>
        <div style="margin-top: 15px">
            <a-menu
                    style="border: none"
                    :default-selected-keys="['0']"
                    :open-keys.sync="openKeys"
                    mode="inline"
                    @click="handleClick"
            >
                <a-menu-item key="0">
                    <a-icon type="mail"/>
                    主页
                </a-menu-item>
                <a-sub-menu key="sub1" @titleClick="titleClick">
                    <span slot="title"><a-icon type="appstore"/><span>文章管理</span></span>
                    <a-menu-item key="1">
                        Option 5
                    </a-menu-item>
                    <a-menu-item key="2">
                        Option 6
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2" @titleClick="titleClick">
                    <span slot="title"><a-icon type="appstore"/><span>数据中心</span></span>
                    <a-menu-item key="5">
                        Option 5
                    </a-menu-item>
                    <a-menu-item key="6">
                        Option 6
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CreateMenu",
        data() {
            return {
                openKeys: ['sub1', 'sub2'],
            };
        },
        methods: {
            handleClick(e) {
                console.log('click', e);
            },
            titleClick(e) {
                console.log('titleClick', e);
            },
            article() {
                const route = this.$router.resolve({
                    path: '/writeArticle',
                    query:{
                        userId:localStorage.getItem("userId")
                    }
                })
                window.open(route.href, '_blank');//打开新的窗口
            }
        },
    }
</script>

<style scoped>

</style>