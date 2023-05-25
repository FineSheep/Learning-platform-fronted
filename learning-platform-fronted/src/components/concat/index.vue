<template>
    <div>
        <a-button type="primary" @click="onVisible">联系管理员</a-button>
        <a-modal v-model="visible" title="联系管理员" @ok="handleOk">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item label="手机号">
                    <a-input
                            placeholder="请输入联系方式"
                            v-decorator="['phone', { rules: [{ required: true, message: '请输入联系方式' }] }]"
                    />
                </a-form-item>
                <a-form-item label="问题描述">
                    <a-textarea
                            placeholder="请输入你的问题"
                            v-decorator="['desc', { rules: [{ required: true, message: '请输入你的问题' }] }]"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "index",
        data() {
            return {
                visible: false,
                form: this.$form.createForm(this, {name: 'coordinated'}),
            }
        },
        methods: {
            onVisible() {
                this.visible = true;
            },
            handleOk() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        myAxios.post("/user/concat", values)
                            .then(res => {
                                this.$message.success("发送成功");
                            })
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>