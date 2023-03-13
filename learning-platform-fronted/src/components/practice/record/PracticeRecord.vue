<template>
    <div style="background-color:rgb(248,248,248);">
        <div style="position: relative;width: 65%;margin: 20px auto;background-color:#fff; padding-left: 20px">
            <div class="card-box">
                <div class="answer-card">答题卡</div>
                <div v-if="hasRadio">
                    <div style="background-color:#fff;">
                        &nbsp;&nbsp; 单选题：
                    </div>
                    <div class="number-list">
                        <div v-for="(item,index) in radio" :key="item.id">
                            <a href="javascript:void(0)"
                               :id="'card-'+item.id"
                               class="number"
                               v-if="upper(item.userAnswer)===item.correct"
                               @click="linkTo(item.id)">
                                {{index+1}}
                            </a>
                            <a href="javascript:void(0)"
                               :id="'card-'+item.id"
                               class="number"
                               style="background-color:red;"
                               v-else
                               @click="linkTo(item.id)">
                                {{index+1}}
                            </a>
                        </div>
                    </div>
                </div>
                <div v-if="hasMulChoice">
                    <div style="background-color:#fff;">
                        &nbsp; &nbsp;多选题：
                    </div>
                    <div class="number-list">
                        <div v-for="(item,index ) in mulChoice" :key="item.id">
                            <a href="javascript:void(0)"
                               :id="'card-'+item.id"
                               class="number"
                               v-if="upper(item.userAnswer)===item.correct"
                               @click="linkTo(item.id)">
                                {{index+1}}
                            </a>
                            <a href="javascript:void(0)"
                               :id="'card-'+item.id"
                               class="number"
                               style="background-color:red;"
                               v-else
                               @click="linkTo(item.id)">
                                {{index+1}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div v-for="(item,index) in radio" :key="item.id">
                <a-tag :id="item.id" color="blue" style="margin-bottom: 10px">
                    单选
                </a-tag>
                <div style="font-weight: bold;font-size: 14px;">{{index+1}}. {{item.content}}</div>
                <a-radio-group style="width: 100%" :value="item.correct">
                    <a-radio value="A" class="option">{{item.optionA}}</a-radio>
                    <a-radio value="B" class="option">{{item.optionB}}</a-radio>
                    <a-radio value="C" class="option" v-if="item.optionC!=null">{{item.optionC}}</a-radio>
                    <a-radio value="D" class="option" v-if="item.optionD!=null">{{item.optionD}}</a-radio>
                </a-radio-group>
                <p style="font-weight: bold;font-size: 14px;">
                    正确答案：{{item.correct}},你的答案：{{upper(item.userAnswer)}}

                    <a-tooltip>
                        <template slot="title">
                            觉得答案有问题，点击反馈
                        </template>
                        <a-icon type="warning" @click="showModel(item.id)"/>
                    </a-tooltip>

                </p>
                <a-divider :dashed="true"/>
            </div>
            <div v-for="(item,index) in mulChoice" :key="item.id">
                <a-tag :id="item.id" color="orange" style="margin-bottom: 10px">
                    多选
                </a-tag>
                <div style="font-weight: bold;font-size: 14px;">{{index+1}}. {{item.content}}</div>
                <a-checkbox-group style="width: 100%">
                    <a-checkbox value="a" class="option checkBox">{{item.optionA}}</a-checkbox>
                    <a-checkbox value="b" class="option checkBox">{{item.optionB}}</a-checkbox>
                    <a-checkbox value="c" class="option checkBox" v-if="item.optionC!=null">{{item.optionC}}
                    </a-checkbox>
                    <a-checkbox value="d" class="option checkBox" v-if="item.optionD!=null">{{item.optionD}}
                    </a-checkbox>
                </a-checkbox-group>
                <p style="font-weight: bold;font-size: 14px;">
                    正确答案：{{item.correct}},你的答案：{{item.userAnswer}}
                    <a-tooltip>
                        <template slot="title">
                            觉得答案有问题，点击反馈
                        </template>
                        <a-icon type="warning" @click="showModel(item.id)"/>
                    </a-tooltip>
                </p>
            </div>
        </div>
        <a-modal
                title="反馈"
                :visible="visible"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-textarea placeholder="反馈信息....." :rows="4" v-model="content"/>
        </a-modal>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "PracticeRecord",
        props: ['radio', 'mulChoice'],
        data() {
            return {
                id: undefined,
                visible: false,
                content: undefined
            }
        }
        , computed: {
            hasRadio() {
                return this.radio != null && this.radio.length !== 0;
            },
            hasMulChoice() {
                return this.mulChoice != null && this.mulChoice.length !== 0;
            },
        },
        methods: {
            handleOk() {
                if (this.content==undefined || this.content.length==0){
                    this.$message.error("请输入信息")
                    return
                }else {
                    myAxios.post('/message/reportPost',this.report)
                    this.$message.success("提交成功，等待管理员处理")
                    this.visible = false
                }
            },
            handleCancel() {
                this.visible = false
            },
            showModel(id) {
                this.visible = true;
                this.id = id;
            },
            upper(str) {
                if (str == null) {
                    return '无';
                }
                return str.toUpperCase();
            },
            linkTo(id) {
                var anchor = document.getElementById(id);
                // chrome
                document.body.scrollTop = anchor.offsetTop;
                // firefox
                document.documentElement.scrollTop = anchor.offsetTop;
                // safari
                window.pageYOffset = anchor.offsetTop;

            }
        }
    }
</script>

<style scoped>


    .option {
        display: block;
        width: 100%;
        height: 40px;
        padding-top: 10px;
        padding-left: 10px;
        /*lineHeight: 30px,*/
    }

    .option:hover {
        background-color: rgb(248, 248, 248);
    }


    .answer-card {
        padding: 10px;
        background-color: white;
        width: 70px;
        text-align: center;
    }

    .card-box {
        position: fixed;
        z-index: 0;
        right: 50px;
    }

    .number-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 200px;
        background-color: white;

    }

    .number {
        color: white;
        background-color: skyblue;
        display: inline-block;
        margin: 5px 5px;
        width: 25px;
        height: 25px;
        line-height: 27px;
        border: 1px solid white;
        border-radius: 50%;
        text-align: center;
    }

</style>