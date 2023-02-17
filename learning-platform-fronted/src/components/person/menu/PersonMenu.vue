<template>
    <div>
        <a-menu v-model="current" mode="horizontal" @click="location">
            <a-menu-item key="">
                发帖
            </a-menu-item>
            <a-menu-item key="personThumb">
                点赞
            </a-menu-item>
            <a-menu-item key="personCollect">
                收藏
            </a-menu-item>
        </a-menu>
        <div style="background-color:#fff; margin-top: 10px; min-height: 300px">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonMenu",
        data() {
            return {
                current: [''],
            };
        },
        mounted() {
            this.$router.push("/personCenter")
        },
        methods: {
            location(e){
                this.$router.push("/personCenter/"+e.key)
            }
        }
    }
</script>

<style scoped>

</style>