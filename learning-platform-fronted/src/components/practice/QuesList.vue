<template>
    <div style="position: relative">
        <a-affix class="card-box">
            <div class="answer-card">答题卡</div>
            <div v-if="hasRadio">
                <div style="background-color:#fff;">
                    单选题：
                </div>
                <div class="number-list">
                    <div v-for="(item,index) in radio" :key="item.id">
                        <a href="javascript:void(0)"
                           :id="'card-'+item.id"
                           class="number"
                           @click="linkTo(item.id)">
                            {{index+1}}
                        </a>
                    </div>

                </div>
            </div>
            <div v-if="hasMulChoice">
                <div style="background-color:#fff;">
                    多选题：
                </div>
                <div class="number-list">
                    <div v-for="(item,index ) in mulChoice" :key="item.id">
                        <a href="javascript:void(0)"
                           :id="'card-'+item.id"
                           class="number"
                           @click="linkTo(item.id)">
                            {{index+1}}
                        </a>
                    </div>
                </div>
            </div>
        </a-affix>

        <div v-for="(item,index) in radio" :key="item.id">
            <a-tag :id="item.id" color="blue" style="margin-bottom: 10px">
                单选
            </a-tag>
            <div style="font-weight: bold;font-size: 14px;">{{index+1}}. {{item.content}}</div>
            <a-radio-group style="width: 100%" @change="radioChange($event,item.id)">
                <a-radio value="a" class="option">{{item.optionA}}</a-radio>
                <a-radio value="b" class="option">{{item.optionB}}</a-radio>
                <a-radio value="c" class="option" v-if="item.optionC!=null">{{item.optionC}}</a-radio>
                <a-radio value="d" class="option" v-if="item.optionD!=null">{{item.optionD}}</a-radio>
            </a-radio-group>
            <a-divider :dashed="true"/>
        </div>
        <div v-for="(item,index) in mulChoice" :key="item.id">
            <a-tag :id="item.id" color="orange" style="margin-bottom: 10px">
                多选
            </a-tag>
            <div style="font-weight: bold;font-size: 14px;">{{index+1}}. {{item.content}}</div>
            <a-checkbox-group style="width: 100%" @change="boxChange($event,item.id)">
                <a-checkbox value="a" class="option checkBox">{{item.optionA}}</a-checkbox>
                <a-checkbox value="b" class="option checkBox">{{item.optionB}}</a-checkbox>
                <a-checkbox value="c" class="option checkBox" v-if="item.optionC!=null">{{item.optionC}}</a-checkbox>
                <a-checkbox value="d" class="option checkBox" v-if="item.optionD!=null">{{item.optionD}}</a-checkbox>
            </a-checkbox-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuesList",
        props: ['radio', 'mulChoice'],
        data() {
            return {
                answer: new Map()
            }
        },
        mounted() {
            this.$bus.$on('send', this.send)
        },
        computed: {
            hasRadio() {
                return this.radio != null && this.radio.length !== 0;
            },
            hasMulChoice() {
                return this.mulChoice != null && this.mulChoice.length !== 0;
            }
        },
        methods: {
            send() {
                console.log("send")
                this.$bus.$emit('getAnswer', this.answer)
            },
            isVisible(id) {
                if (this.answer.get(id) === undefined) {
                    console.log(true);
                    return true;
                }
                console.log(false);
                return false;
            },
            radioChange(e, id) {
                if (this.answer.get(id) == null) {
                    const el = document.getElementById("card-" + id);
                    el.style.cssText = 'color: white;background-color: skyblue;';
                }
                this.answer.set(id, e.target.value);
            },
            linkTo(id) {
                var anchor = document.getElementById(id);
                // chrome
                document.body.scrollTop = anchor.offsetTop;
                // firefox
                document.documentElement.scrollTop = anchor.offsetTop;
                // safari
                window.pageYOffset = anchor.offsetTop;

            },
            listToStr(list) {
                let res = '';
                for (let item of list) {
                    res = res.concat(item);
                }

                return res;
            },
            boxChange(e, id) {
                this.answer.set(id, this.listToStr(e));
                const arr = this.answer.get(id);
                if (arr == null || arr.length !== 0) {
                    const el = document.getElementById("card-" + id);
                    el.style.cssText = 'color: white;background-color: skyblue;';
                } else if (arr.length === 0) {
                    const el = document.getElementById("card-" + id);
                    el.style.cssText = 'color: #bbb;background-color: white;';
                }

            }
        },
    }
</script>

<style scoped>
    .option {
        display: inline-block;
        width: 100%;
        height: 40px;
        padding-top: 10px;
    }

    .option:hover {
        background-color: rgb(248, 248, 248);
    }

    .checkBox {
        margin-left: 0px;
    }

    .answer-card {
        padding: 10px;
        background-color: white;
        width: 70px;
        text-align: center;
    }

    .card-box {
        position: absolute;
        top: 20px;
        right: -250px;

    }

    .number-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 200px;
        background-color: white;
    }

    .number {
        display: inline-block;
        margin: 5px 5px;
        width: 25px;
        height: 25px;
        line-height: 27px;
        border: 1px solid #bbb;
        color: #bbb;
        border-radius: 50%;
        text-align: center;
    }

</style>