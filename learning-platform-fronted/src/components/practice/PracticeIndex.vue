<template>
    <div style="position: relative">
        <div class="menu-prac">
            <a-menu mode="horizontal" style="margin-bottom: 10px" @click="menuSearch">
                <a-menu-item key="">
                    个人练习
                </a-menu-item>
                <a-menu-item key="PK">
                    PK对战
                </a-menu-item>
            </a-menu>
            <div >
                <router-view/>
            </div>
        </div>
        <a-affix :offset-top="120" :style="{'display': 'inline-block','position': 'absolute','margin-left': '20px','top':'100px'}">
            <leader-board/>
        </a-affix>
    </div>
</template>

<script>
    import LeaderBoard from "@/components/practice/LeaderBoard";

    export default {
        name: "PracticeIndex",
        components: {LeaderBoard},
        data() {
            return {}
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

    .leader-border {

    }
</style>