<template>
    <div>
        <a-button type="primary" @click="match">
            寻找对手
        </a-button>
        <div v-if="matching" class="popContainer">
            <div class="box">
                <img src="http://192.168.111.128:9000/video/waiting.svg"/>
                <div class="center-box">
                    <br/>
                    <p style="color:white; font-size: 15px">努力匹配中...</p>
                    <a-button type="primary" @click="cancel">取消匹配</a-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: "PK",
        data() {
            return {
                matching: false,
            }
        },
        methods: {
            cancel() {
                this.matching = false;
                this.$socket.sendSock({
                    'type': 'CANCEL_MATCH'
                })
            },
            match() {
                this.matching = true;
                this.$socket.sendSock({
                    'type': 'MATCH_USER'
                }, this.getWsData)
            },
            getWsData(res) {
                console.log(res)
                if (res.code == 0) {
                    this.$message.success('匹配成功，3秒后进入游戏！');

                    setTimeout(() => {
                        this.$router.push({
                                path: '/pkExercise',
                                query: {
                                    user: Number(localStorage.getItem('userId')),
                                    opponent: Number(res.data)
                                }
                            }
                        )
                    }, 3000)

                } else {
                    this.$message.info('请重新匹配！');

                }
            }
        }
    }
</script>

<style scoped>
    .waiting {
        height: 100%;
        background-color: skyblue;
    }

    .popContainer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
    }

    img {
        width: 200px;
        height: 200px;
    }

    .box {
        width: 300px;
        height: 300px;
        margin: auto auto;
    }

    .center-box {
        padding-left: 60px;
    }
</style>