<template>
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content>
            <a-layout style="padding: 24px 0; background: #fff">
                <a-layout-sider width="200" style="background: #fff">
                    <a-menu
                            mode="inline"
                            :default-selected-keys="['info']"
                            style="height: 100%"
                    >

                        <a-menu-item key="info">
                            <a-icon type="idcard"/>
                            个人资料
                            <router-link to="/editPerson"/>
                        </a-menu-item>

                        <a-menu-item key="setting">
                            <a-icon type="setting"/>
                            账号设置
                            <router-link to="/editPerson/accountSetting"/>
                        </a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
                    <router-view/>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>
<script>

    export default {
        name: "EditPerson",
        data() {
            return {
            };
        },
        methods: {},
    };
</script>
<style scoped>

</style>