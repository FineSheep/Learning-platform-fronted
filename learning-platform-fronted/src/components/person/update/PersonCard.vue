<template>
    <div style="height: 200px;">
        <div>
            <img :src="cardImg.createPerson" class="card-img">
            <span style="font-weight: 600;font-size: 18px">创作中心</span>
        </div>
        <div class="card center">
            <div class="word-div center">
                <div>
                    发帖
                    <div class="center">
                        {{postNum}}
                    </div>
                </div>
            </div>
            <div class="word-div center">
                <div>
                    点赞
                    <div class="center">
                        {{thumbNum}}
                    </div>
                </div>
            </div>
            <div class="word-div center">
                <div>
                    收藏
                    <div class="center">
                        {{collectNum}}
                    </div>
                </div>

            </div>
        </div>
        <div class="center">
            <a-button style="color: rgb(24,144,255);border-color:rgb(24,144,255)" @click="more">进入创作中心 ></a-button>
        </div>
    </div>
</template>

<script>
    import card from '@/assets/personcard/perconcard.png'

    export default {
        name: "PersonCard",
        props: ['postNum', 'collectNum', 'thumbNum'],
        data() {
            return {
                cardImg: {
                    createPerson: card
                }
            }
        },
        methods: {
            more() {
                this.$router.push('/content');
            }
        }
    }
</script>

<style scoped>
    .card-img {
        height: 40px;
        width: 100px;
    }

    .word-div {
        width: 28%;
        font-weight: 600;
        font-size: 18px;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        margin: 10px;
        height: 50%;
        background-color: rgb(249, 249, 251);
    }

    .bottom {
        display: flex;
        justify-content: center;
        align-items: end;
    }
</style>