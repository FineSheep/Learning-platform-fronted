<template>
    <div style="position: relative">
        <div class="good-card">
            <ul>
                <li v-if="judge.thumbed">
                    <img class="img-img" :src="img.good_true" @click="changeGood"/>
                </li>
                <li v-else>
                    <img class="img-img" :src="img.good_false" @click="changeGood"/>
                </li>
                <li v-if="judge.collected">
                    <img class="img-img" :src="img.collect_true" @click="changeCollect"/>
                </li>
                <li v-else>
                    <img class="img-img" :src="img.collect_false" @click="changeCollect"/>
                </li>
            </ul>
        </div>
        <!--        <good-card :post-id="postId" :good="judge.thumbed" :collect="judge.collected"/>-->
        <div v-html="markdownToHtml" class="markdown-body" style="padding: 20px"></div>
    </div>


</template>

<script>
    import myAxios from "@/axios/myAxios";
    import {marked} from 'marked';
    import 'github-markdown-css';
    import good_false from '@/assets/post/good-false.svg'
    import good_true from '@/assets/post/good-true.svg'
    import collect_false from '@/assets/post/collect-false.svg'
    import collect_true from '@/assets/post/collect-true.svg'
    import GoodCard from "@/components/post/goodCard";

    export default {
        name: "PostSpecific",
        components: {GoodCard},
        data() {
            return {
                markdown: "",
                postId: 0,
                img: {
                    good_true, good_false, collect_false, collect_true
                },
                judge: {
                    thumbed: false,
                    collected: false
                }
            };
        },
        computed: {
            markdownToHtml() {
                return marked(this.markdown);
            }
        },
        async created() {
            console.log(this.judge.collected)
            await this.getPost()
            console.log(this.judge.collected)
        },
        methods: {
            changeGood() {
                this.judge.thumbed = !this.judge.thumbed;
                const userId = localStorage.getItem('userId')
                myAxios.get(`coTh/thumb?userId=${userId}&postId=${this.postId}`)
            },
            changeCollect() {
                this.judge.collected = !this.judge.collected;
                const userId = localStorage.getItem('userId')
                myAxios.get(`coTh/collect?userId=${userId}&postId=${this.postId}`)
            },
            async getPost() {
                const id = this.$route.query.postId;
                this.postId = id;
                const type = this.$route.query.type;
                if (type == 'post') {
                    const res = await myAxios.get(`/post/getPost?postId=${id}&userId=${localStorage.getItem('userId')}`)
                    this.judge.thumbed = res.data.thumbed
                    console.log(res.data)
                    this.judge.collected = res.data.collected
                    console.log(this.judge.collected)
                    this.markdown = res.data.content
                }
            }
        }
    }
</script>

<style scoped>
    .good-card {
        position: absolute;
        left: -150px;
        top: 100px;
    }

    .img-img {
        height: 40px;
        width: 40px;
    }

    .img-img:hover {
        cursor: pointer;
    }

    ul {
        list-style: none;
    }
</style>