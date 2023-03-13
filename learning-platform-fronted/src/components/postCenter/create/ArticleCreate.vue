<template>
    <div>
        <div>
            <a-input placeholder="请输入标题..." class="title-input" v-model="post.title"/>
            <a-button type="primary" @click="show">
                提交
            </a-button>
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
                    <a-form-item label="封面">
                        <div>
                            <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    :before-upload="beforeUpload"
                                    :customRequest="upload"
                                    v-decorator="['img', { rules: [{ required: false, message: '请上传封面' }] }]"
                            >
                                <img v-if="post.photo" :src="post.photo" style="width: 100px;height: 100px"/>
                                <div v-else>
                                    <a-icon type="plus"/>
                                    <div class="ant-upload-text">
                                        点击上传
                                    </div>
                                </div>
                            </a-upload>
                        </div>
                    </a-form-item>
                    <a-form-item label="文章介绍">
                        <a-textarea :rows="4"
                                    v-decorator="['description', { rules: [{ min:25,max:100,required: true, message: '介绍最少25字，最多100字' }] }]"/>
                    </a-form-item>
                </a-form>
            </a-modal>
        </div>
        <div style="position: relative;z-index: 2">
            <mavon-editor
                    v-model="post.content"
                    ref="md"
                    @change="change"
                    style="min-height: 600px"
                    @imgAdd="imgAdd"
            />
        </div>
    </div>
</template>
<script>
    import myAxios from "@/axios/myAxios";
    // 导入组件 及 组件样式
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: "ArticleCreate",
        components: {mavonEditor},
        data() {
            return {
                formLayout: 'horizontal',
                // 注册
                form: this.$form.createForm(this, {name: 'coordinated'}),
                tags: [],
                post: {
                    html: '',// 及时转的html
                    content: '',// 输入的markdown
                    title: '',
                    tags: [],
                    description: '',
                    photo: ''
                },
                visible: false,
            }
        },
        async mounted() {
            const res = await myAxios.get('/tag/getTags');
            const tags = res.data;
            this.tags = tags
            const postId = this.$route.query.postId;
            if (postId != undefined) {
                const postRes = await myAxios.get(`/post/getPost?postId=${postId}`)
                this.post.content = postRes.data.content
                this.post.title = postRes.data.title
                this.post.description = postRes.data.description
                this.post.photo = postRes.data.photo
                this.post.tags = JSON.parse(postRes.data.tags)
            }
        },
        methods: {
            // 所有操作都会被解析重新渲染
            change(value, render) {
                // render 为 markdown 解析后的结果[html]
                this.post.html = render;
            },
            // 将图片上传到服务器，返回地址替换到md中
            async imgAdd(pos, $file) {
                var formdata = new FormData();
                formdata.append('img', $file);
                const res = await myAxios.post("/img/postImg", formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (res.code == 0) {
                    var url = res.data.thUrl;
                    this.$refs.md.$img2Url(pos, url);
                }
            },
            handleOk() {
                this.form.validateFields((err, val) => {
                    if (!err) {

                        this.visible = false
                        this.post.tags = val.tags;
                        this.post.description = val.description;
                        if (this.post.title.length == 0 | this.post.html.length == 0) {
                            this.$message.error("请填写相关内容");
                            return;
                        }
                        myAxios.post('/post/savePost', this.post)
                        this.$router.push('/successful');
                    }
                })

            },
            handleCancel() {
                this.visible = false
            },
            show() {
                this.visible = true;
                this.$nextTick(()=>{
                    this.form.setFieldsValue({
                        tags: this.post.tags,
                        img: this.post.photo,
                        description: this.post.description
                    })
                })
            },
            async upload(file) {
                const form = new FormData()
                form.append('img', file.file)

                const res = await myAxios.post('/img/postImg',
                    form,
                    {
                        headers: {'Content-Type': 'multipart/form-data'},
                    })
                if (res.code == 0) {
                    // 调用组件内方法, 设置为成功状态
                    file.onSuccess(res, file.file);
                    file.status = 'done';
                    this.post.photo = res.data.url;

                    this.$message.success("上传成功")
                } else {
                    file.onError()
                    file.status = 'error'
                }
            },
            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('只能上传jpg文件');
                }
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                    this.$message.error('图片大小不能超过5MB!');
                }
                return isJpgOrPng && isLt5M;
            },
        }
    }

</script>
<style scoped>
    .title-input {
        height: 50px;
        border: none;
        font-size: 20px;
        font-weight: 600;
        width: 90%;
    }
</style>