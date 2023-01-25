<template>
    <div class="time-font time-box">
        {{hour}}:{{minute}}:{{second}}
    </div>
</template>

<script>
    export default {
        name: "GetTimer",
        data() {
            return {
                hour: 0,
                minute: 0,
                second: 0
            }
        },
        created() {
            this.start();
        },
        watch: {
            second() {
                if (this.second >= 60) {
                    this.second -= 60
                    this.minute++;
                }
            },
            minute(){
                if (this.minute >= 60) {
                    this.minute -= 60
                    this.hour++;
                }
            }
        },
        methods: {
            start() {
                const that = this;
                setInterval(function () {
                    that.second++;
                }, 1000)
            },
        }

    }
</script>

<style scoped>
    .time-font {
        font-family: Helvetica Neue;
        font-weight: 600;
    }

    .time-box {
        background-color: rgb(238,240,241);
        border-radius: 20px;
        width: 80px;
        text-align: center;
    }
</style>