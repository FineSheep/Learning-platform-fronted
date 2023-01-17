<template>
    <div>
        <div class="menu-prac">
            <a-menu  mode="horizontal" style="margin-bottom: 10px" @click="menuSearch">
                <a-menu-item key="">
                    个人练习
                </a-menu-item>
                <a-menu-item key="PK">
                    PK对战
                </a-menu-item>
            </a-menu>
                <router-view/>

        </div>

    </div>
</template>

<script>
    export default {
        name: "PracticeIndex",
        data() {
            return {
            }
        },
        methods: {
            menuSearch(e) {
                this.$router.push(`/PracticeIndex/${e.key}`)
            }
        }
    }
</script>

<style scoped>
    .menu-prac {
        width: 70%;
        display: inline-block;
    }
</style>