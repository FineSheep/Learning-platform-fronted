<template>
    <div>
        <a-space>
            <a-button type="primary" @click="plus">
                <a-icon type="plus" @click="plus"/>
                增加
            </a-button>
            <a-upload
                    name="file"
                    :multiple="false"
                    :customRequest="upload"
            >
                <a-button :style="{ marginLeft: '8px' }">
                    <a-icon type="upload"/>
                    上传
                </a-button>
            </a-upload>
            <a-button type="primary" @click="templateDownload">
                <a-icon type="vertical-align-bottom"/>
                模板下载
            </a-button>
        </a-space>
        <a-modal
                title="增加题目"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form :form="form" layout="horizontal" :label-col="{span:4}" :wrapper-col="{span:18}">
                <a-form-item label="题目内容">
                    <a-textarea
                            :auto-size="{ minRows: 1, maxRows: 4 }"
                            v-decorator="[`content`,{
                                                rules:[{
                                                    required:true,
                                                    message:'请输入题目内容'
                                                }]
                                            }]"
                            placeholder="请输入"
                    />
                </a-form-item>
                <a-form-item label="答案A">
                    <a-textarea
                            :auto-size="{ minRows: 1, maxRows: 4 }"
                            v-decorator="[`optionA`,{
                                                rules:[{
                                                    required:true,
                                                     message:'请输入选项A'
                                                }]
                                            }]"
                            placeholder="请输入"
                    />
                </a-form-item>
                <a-form-item label="答案B">
                    <a-textarea
                            :auto-size="{ minRows: 1, maxRows: 4 }"
                            v-decorator="[`optionB`,{
                                                rules:[{
                                                    required:true,
                                                     message:'请输入选项B'
                                                }]
                                            }]"
                            placeholder="请输入"
                    />
                </a-form-item>
                <a-form-item label="答案C">
                    <a-textarea
                            :auto-size="{ minRows: 1, maxRows: 4 }"
                            v-decorator="[`optionC`,{
                                            }]"
                            placeholder="请输入"
                    />
                </a-form-item>
                <a-form-item label="答案D">
                    <a-textarea
                            :auto-size="{ minRows: 1, maxRows: 4 }"
                            v-decorator="[`optionD`,{
                                            }]"
                            placeholder="请输入"
                    />
                </a-form-item>
                <a-form-item label="正确选项">
                    <a-select
                            placeholder="选择"
                            mode="multiple"
                            v-decorator="[`correct`,{
                                                rules:[{
                                                    required:true,
                                                     message:'请选择答案'
                                                }]
                                            }]"
                    >
                        <a-select-option key="A">A</a-select-option>
                        <a-select-option key="B">B</a-select-option>
                        <a-select-option key="C">C</a-select-option>
                        <a-select-option key="D">D</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "QuesAdd",
        data() {
            return {
                form: this.$form.createForm(this, {name: 'ques_add'}),
                visible: false,
                confirmLoading: false,
                question: {},
            }
        },
        methods: {
            templateDownload() {
                /* 在axios请求中加入responseType: 'blob'参数,表示接收的数据为二进制文件流 */
                myAxios.get(`sysQues/downloadTemplate`, {responseType: 'blob'}).then(res => {
                    const blob = new Blob([res]);//处理文档流
                    const fileName = '题目模板.xlsx';
                    const elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                })

            },
            async upload(file) {
                const form = new FormData()
                form.append('file', file.file)
                const res = await myAxios.post('/sysQues/uploadQues',
                    form,
                    {
                        headers: {'Content-Type': 'multipart/form-data'},
                    })
                if (res.code == 0) {
                    // 调用组件内方法, 设置为成功状态
                    file.onSuccess(res, file.file);
                    file.status = 'done';
                    this.$message.success("上传成功")
                } else {
                    file.onError()
                    file.status = 'error'
                    this.$message.error("上传失败，请仔细检查文件")
                }
            },
            plus() {
                this.visible = true;
            },
            handleOk(e) {
                this.form.validateFields((error, values) => {
                    if (!error) {
                        let correctArr = values.correct.sort();
                        let correct = "";
                        for (let item of correctArr) {
                            correct += item;
                        }
                        const form = {
                            id: null,
                            content: values.content,
                            optionA: values.optionA,
                            optionB: values.optionB,
                            optionC: values.optionC,
                            optionD: values.optionD,
                            correct: correct,
                            type: correct.length == 1 ? 0 : 1
                        }
                        this.confirmLoading = true;

                        setTimeout(() => {
                            this.visible = false;
                            this.confirmLoading = false;
                            myAxios.post('/sysQues/saveOrUpdateQues', form)
                        }, 1000);
                        this.$message.success('添加成功');
                    }

                })

            },
            handleCancel(e) {
                this.visible = false;
            },
        }
    }
</script>

<style scoped>

</style>