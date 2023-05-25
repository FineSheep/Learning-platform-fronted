<template>
    <div >
        <hot-and-new class="hotAndNew"/>
        <ListNews class="page"/>
    </div>
</template>

<script>
    import ListNews from "@/components/case/crawList/ListNews";
    import HotAndNew from "@/components/case/component/HotAndNew";
    export default {
        components: {
            HotAndNew,
            ListNews
        },
    }
</script>

<style scoped>
    .page{
        width: 80%;
        padding: 20px;
    }

    .hotAndNew{
        position: absolute;
        right: 20px;
    }
</style>