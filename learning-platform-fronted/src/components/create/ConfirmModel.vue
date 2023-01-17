<template>
    <a-modal
            title="发布文章"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            ok-text="确认"
            cancel-text="取消"
    >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="标签">
                <a-select
                        mode="multiple"
                        style="width: 80%; display: inline-block"
                        placeholder="请选择标签"
                        v-decorator="['tags', { rules: [{ required: true, message: '请选择标签' }] }]"
                >
                    <a-select-option v-for="item in tags" :key="item.id">
                        {{item.tagName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="文章介绍">
                <a-textarea :rows="4"
                            v-decorator="['description', { rules: [{ min:50,max:100,required: true, message: '介绍最少50字，最多100字' }] }]"/>
            </a-form-item>
        </a-form>
    </a-modal>

</template>

<script>
    import myAxios from "@/axios/myAxios";

    export default {
        name: "ConfirmModel",
        props: ['isVisible'],
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                visible: this.isVisible,
                tags: [],
                post: {
                    content: '',
                    userId: 0,
                    title: '',
                    tags: [],
                    description: '',
                    photo: ''
                }
            }
        },
        watch: {
            isVisible() {
                this.visible = this.isVisible;
            },
        },
        async mounted() {
            const res = await myAxios.get('/tag/getTags');
            const tags = res.data;
            this.tags = tags
            this.$bus.$on('getData', this.getData)

        },
        methods: {
            getData(data) {
                this.post.userId = Number(data.userId);
                this.post.content = data.content;
                this.post.title = data.title;
                console.log("post", this.post)
            },
            handleOk(e) {
                e.preventDefault();
                this.form.validateFields((err, val) => {
                    const that = this;
                    this.post.tags = val.tags;
                    this.post.description = val.description;
                    if (!err) {
                        if (this.isNull(this.post.title, this.post.content, this.post.userId)) {
                            myAxios.post('/post/savePost', this.post)
                                .then(function (res) {
                                    if (res.code === 0) {
                                        that.$router.push('/successful');
                                    }
                                })
                        } else {

                            this.$message.warn('请刷新重试');
                        }
                    }
                });
            },
            isNull(...test) {
                for (let item in test) {
                    if (test[item] == "" || test[item] == null || test[item] == undefined) {
                        return false;
                    }
                }
                return true;
            },
            handleCancel(e) {
                console.log('Clicked cancel button');
                this.visible = false;
                this.trans();
            },
            trans() {
                this.$emit('transform', this.visible)
            }
        }
    }
</script>

<style scoped>

</style>