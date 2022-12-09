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
                <a-layout style="padding: 0 24px 24px">
                    <a-layout-content
                            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
                    >
                        <list-card/>
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

    import MenuSearch from "@/components/pages/MenuSearch";
    import ListCard from "@/components/pages/ListCard";

    export default {
        name: "LayOut",
        components: {ListCard, MenuSearch}
    }
</script>
<style scoped>
    #components-layout-demo-top-side-2 {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 28px 16px 0;
        float: left;
    }
</style>