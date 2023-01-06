<template>
    <div>
        <a-layout>
            <a-affix :offset-top="top">
                <a-layout-header style="background: white">
                    <menu-search/>
                </a-layout-header>
            </a-affix>
            <a-layout>
                <a-layout-content
                        class="context"
                        style=" background-color: white;padding: 20px"
                >
                    <router-view/>
                </a-layout-content>
            </a-layout>
        </a-layout>


    </div>

</template>


<script>

    import MenuSearch from "@/components/pages/search/MenuSearch";

    export default {
        name: "LayOut",
        components: {MenuSearch}
    }
</script>
<style scoped>
    .context {
        width: 70%;
        margin: 20px auto;
    }
</style>