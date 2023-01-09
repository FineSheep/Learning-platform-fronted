<template>
    <div>
        <a-layout>
            <a-affix :offset-top="0">
                <a-layout-header style="background: white">
                    <menu-search/>
                </a-layout-header>
            </a-affix>
            <a-layout style="background-color: rgb(247,248,249)">
                <a-layout-content
                        class="context"
                >
                    <router-view/>
                </a-layout-content>
            </a-layout>
        </a-layout>


    </div>

</template>


<script>

    import MenuSearch from "@/components/search/MenuSearch";

    export default {
        name: "LayOut",
        components: {MenuSearch}
    }
</script>
<style scoped>
    .context {
        width: 70%;
        margin: 10px auto;
    }
</style>