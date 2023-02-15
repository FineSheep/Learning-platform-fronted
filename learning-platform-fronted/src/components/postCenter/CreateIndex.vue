<template>
    <div>
        <a-layout>
            <a-layout-sider theme="light">
                <div style="background-color:white;">
                    <div style="margin: 0 auto;width: 70%; padding-top: 20px">
                        <a-button type="primary" block @click="article"> 写文章</a-button>
                    </div>
                    <div style="margin-top: 15px;background-color:#fff;">
                        <a-menu
                                mode="inline"
                                @click="handleClick"
                        >
                            <a-menu-item key="">
                                <a-icon type="book"/>
                                内容管理
                            </a-menu-item>
                            <a-menu-item key="comment">
                                <a-icon type="read"/>
                                评论管理
                            </a-menu-item>
                            <a-menu-item key="data">
                                <a-icon type="database"/>
                                作品数据
                            </a-menu-item>
                        </a-menu>
                    </div>
                </div>
            </a-layout-sider>
            <a-layout-content>
                <router-view/>
                <a-back-top/>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>

    export default {
        name: "CreateIndex",
        methods: {
            handleClick(e) {
                this.$router.push("/create/" + e.key);
            },
            article() {
                const route = this.$router.resolve({
                    path: '/writeArticle',
                    query: {
                        userId: localStorage.getItem("userId")
                    }
                })
                window.open(route.href, '_blank');//打开新的窗口
            }
        },
    }
</script>

<style scoped>

</style>