<template>
    <div>
        <div class="leader">
            <img src="../../assets/leaderBorder.png" style="width: 270px;border-radius: 10px"/>
            <div>
                <p class="list" style="right: 80px" @click="typeDay" :class="{white:day_check}">日榜</p>
                <p class="list" @click="typeTotal" :class="{white: total_check}">总榜</p>
            </div>
            <div v-if="list_type=='day'">
                <leader-person :leaders="this.leaders.day"/>
            </div>
            <div v-else>
                <leader-person :leaders="this.leaders.total"/>

            </div>
        </div>
    </div>
</template>

<script>
    import LeaderPerson from "@/components/practice/LeaderPerson";
    import myAxios from "@/axios/myAxios";

    export default {
        name: "LeaderBoard",
        components: {LeaderPerson},
        data() {
            return {
                list_type: 'day',
                day_check: true,
                total_check: false,
                leaders: {
                    total: [],
                    day: []
                }
            }
        },
        async mounted() {
            await this.getLeader();
        },
        methods: {
            async getLeader() {
                const res = await myAxios.get('/leader/getLeader');
                this.leaders.day = res.data.day;
                this.leaders.total = res.data.total;
            },
            typeDay() {
                this.list_type = 'day'
                this.day_check = true
                this.total_check = false
            },
            typeTotal() {
                this.list_type = 'total'
                this.day_check = false
                this.total_check = true
            }
        }
    }
</script>

<style scoped>
    .leader {
        background-color: white;
        margin-top: 2px;
        border-top: none;
        border-radius: 10px;
        position: relative;

    }

    .list {
        position: absolute;
        top: 20px;
        right: 30px;
        padding: 5px 7px;
        border-radius: 13px;

    }

    .list:hover {
        cursor: pointer;
    }

    .white {
        background-color: white;
    }

</style>