<template>
    <div>
        <ListCard class="page"/>
        <hot-and-new class="hotAndNew"/>
    </div>
</template>

<script>
    import ListCard from "@/components/case/card/ListCard";
    import HotAndNew from "@/components/case/component/HotAndNew";


    export default {
        components: {
            HotAndNew,
            ListCard
        },

    }
</script>

<style scoped>
    .page {
        width: 80%;
        padding: 20px;
    }

    .hotAndNew {
        position: absolute;
        top: 70px;
        right: 20px;
    }
</style>