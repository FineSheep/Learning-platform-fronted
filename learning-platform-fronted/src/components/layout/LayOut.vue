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
            <a-back-top/>
            <a-layout-footer style="text-align: center">
                <a-space>
                    <div>站长©finesheep</div>
                    <a-icon type="github" @click="github"/>
                    <a href="https://beian.miit.gov.cn/#/Integrated/recordQuery">湘ICP备2022021885号</a>
                </a-space>

            </a-layout-footer>
        </a-layout>
    </div>

</template>


<script>

    import MenuSearch from "@/components/search/MenuSearch";

    export default {
        name: "LayOut",
        components: {MenuSearch},
        methods:{
            github(){
                location.href='https://github.com/FineSheep/learning-platform-banckend'
            }
        }
    }
</script>
<style scoped>
    .context {
        width: 90%;
        margin: 0 auto;
        /*padding-left: 20px;*/
        padding: 20px;
        min-height: 580px;
    }
</style>