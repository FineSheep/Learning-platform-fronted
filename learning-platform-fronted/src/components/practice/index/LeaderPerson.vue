<template>
    <div>
        <div v-if="this.leaders!=null && this.leaders.length!=0">
            <div style="margin: 20px 10px" v-for="(item,index) of leaders" :key="index">
                <a-row>
                    <a-col :span="2">
                        <img :src="imgList[index]" style="width: 20px;height: 20px"/>
                    </a-col>
                    <a-col :span="10">{{item.username}}</a-col>
                    <a-col :span="5" style="float: right">{{item.correctNum}}题</a-col>
                </a-row>
            </div>
        </div>
        <div v-else>
            <a-empty description="暂无人上榜，快来当第一吧！"/>
        </div>
    </div>
</template>

<script>
    let img1 = require('../../../assets/one.svg');
    let img2 = require('../../../assets/two.svg');
    let img3 = require('../../../assets/three.svg');
    let img4 = require('../../../assets/four.svg');
    let img5 = require('../../../assets/five.svg');
    export default {
        name: "LeaderPerson",
        props: ['leaders'],
        data() {
            return {
                imgList: [img1, img2, img3, img4, img5]
            }
        },
    }
</script>

<style scoped>

</style>