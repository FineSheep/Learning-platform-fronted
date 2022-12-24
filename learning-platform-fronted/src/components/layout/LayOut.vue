<template>
    <div>
        <a-layout>
            <a-layout-header style="background: white">
                <menu-search/>
            </a-layout-header>
            <a-layout>
                <a-layout-sider width="200" style="background: rgba(240,242,245)">
                    侧边左
                </a-layout-sider>
                <a-layout style="padding: 0 24px 24px;margin-top: 20px">
                    <a-layout-content
                            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
                    >
                        <router-view/>
                    </a-layout-content>
                </a-layout>
                <a-layout-sider width="200" style="background: rgba(240,242,245)">
                    侧边右
                </a-layout-sider>
            </a-layout>
        </a-layout>


    </div>

</template>


<script>

    import MenuSearch from "@/components/pages/search/MenuSearch";

    export default {
        name: "LayOut",
        components: { MenuSearch}
    }
</script>
<style scoped>

</style>