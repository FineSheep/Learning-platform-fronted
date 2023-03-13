<template>
    <a-layout id="components-layout-demo-responsive">
        <a-layout-sider
                theme="light"
        >
            <a-menu mode="inline" @click="linkTo">
                <a-menu-item key="">
                    <span>评论通知</span>
                    <a-badge v-if="data.comment" dot/>
                </a-menu-item>
                <a-menu-item key="thumbAndCollect">
                    <span>点赞和收藏</span>
                    <a-badge dot v-if="data.thumbCollect"/>
                </a-menu-item>
                <a-menu-item key="system">
                    <span>系统通知</span>
                    <a-badge dot v-if="data.system"/>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout-content style="margin-left: 20px">
            <div style="min-height: 550px;background: #fff;">
                <router-view/>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "MailIndex",
        data() {
            return {
                data: {},
            }
        },
        mounted() {
            this.getCounts();
        },
        methods: {
            linkTo(e) {
                this.$router.push(`/mail/${e.key}`)
            },
            getCounts() {
                const that = this;
                myAxios.get(`/message/dotMessageAll`)
                    .then(function (res) {
                        that.data = res.data;
                    })
            }
        },
    }
</script>

<style scoped>

</style>