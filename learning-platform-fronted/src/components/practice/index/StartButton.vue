<template>
    <div>
        <a-button type="primary" @click="showModal">
            开始训练吧
        </a-button>
        <a-modal v-model="visible" title="题目设置" @ok="handleOK" ok-text="确认" cancel-text="取消">
            <a-row>
                <a-col :span="4"><p style="margin-top: 10px">题目数量：</p></a-col>
                <a-col :span="14">
                    <a-slider v-model="ques.sum" :min="1" :max="20" style="marginLeft: 16px"/>
                </a-col>
                <a-col :span="3">
                    <a-input-number v-model="ques.sum" :min="1" :max="20" style="marginLeft: 16px"/>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="4"><p>题目来源：</p></a-col>
                <a-radio-group v-model="ques.source" class="radio-center">
                    <a-radio value="mistake">
                        错题
                    </a-radio>
                    <a-radio value="new">
                        新题
                    </a-radio>
                    <a-radio value="mix">
                        综合
                    </a-radio>
                    <a-radio value="random">
                        随机
                    </a-radio>
                </a-radio-group>
            </a-row>
            <a-row>
                <a-col :span="4"><p>题目难度：</p></a-col>
                <a-radio-group v-model="ques.difficulty" class="radio-center">
                    <a-radio value="one">
                        入门
                    </a-radio>
                    <a-radio value="two">
                        简单
                    </a-radio>
                    <a-radio value="three">
                        中等
                    </a-radio>
                    <a-radio value="four">
                        困难
                    </a-radio>
                </a-radio-group>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "StartButton",
        data() {
            return {
                visible: false,
                ques: {
                    sum: 10,
                    source: 'mistake',
                    difficulty: 'one',
                    userId: "",
                }
            }
        },

        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.visible = false;

                    }
                });
            },
            showModal() {
                this.visible = true;
            },
            async handleOK() {
                this.$router.push({
                    path: `/questions`,
                    query: {
                        difficulty: this.ques.difficulty,
                        source: this.ques.source,
                        sum: this.ques.sum
                    }
                })
            },

        },
    }
</script>

<style scoped>
    .radio-center {
        display: flex;
        justify-content: space-around
    }
</style>