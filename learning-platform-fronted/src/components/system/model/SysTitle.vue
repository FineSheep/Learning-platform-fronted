<template>
    <div class="font-title">
        <div style="margin-top: 20px;margin-left: 10px">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: "SysTitle",
        props:['title']
    }
</script>

<style scoped>
    .font-title{
        font-weight: 600;
        font-size: 20px;
        width: 100%;
        height: 60px;
        display: inline-block;
        background-color: white;
    }
</style>