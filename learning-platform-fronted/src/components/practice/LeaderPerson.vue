<template>
    <div>
        <div style="margin: 20px 10px" v-for="(item,index) of imgList" :key="index">
            <a-row>
                <a-col :span="2">
                    <img :src="item" style="width: 20px;height: 20px"/>
                </a-col>
                <a-col :span="10">名字</a-col>
                <a-col :span="5" style="float: right">1111题</a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    let img1 = require('../../assets/one.svg');
    let img2 = require('../../assets/two.svg');
    let img3 = require('../../assets/three.svg');
    let img4 = require('../../assets/four.svg');
    let img5 = require('../../assets/five.svg');
    export default {
        name: "LeaderPerson",
        data() {
            return {
                imgList: [img1, img2, img3, img4, img5]
            }
        },
    }
</script>

<style scoped>

</style>