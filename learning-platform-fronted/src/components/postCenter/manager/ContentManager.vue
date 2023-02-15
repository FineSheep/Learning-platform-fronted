<template>
    <div style="background-color:#fff; padding: 20px">
        <div style="margin: 20px">
            <a-space size="large">
                <a-range-picker @change="onChange" :locale="locale" style="width: 200px"/>
                <a-select
                        mode="multiple"
                        style="width: 200px"
                        placeholder="请选择标签"
                        @change="tagChange"
                >
                    <a-select-option v-for="item in tags" :key="item.id">
                        {{item.tagName}}
                    </a-select-option>
                </a-select>
                <a-button type="primary">搜索</a-button>
            </a-space>
        </div>
        <div>
            <data-list :data-list="dataList"/>
        </div>
    </div>
</template>

<script>
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import myAxios from "@/axios/myAxios";
    import DataList from "@/components/postCenter/manager/DataList";

    export default {
        name: "ContentManager",
        components: {DataList},
        data() {
            return {
                locale,
                tags: [],
                dataList: [],
                selectActions: {
                    startTime: '',
                    endTime: '',
                    tags: []
                }
            }
        },
        mounted() {
            this.getTags()
            this.getPost()
        },
        methods: {
            getPost() {
                const that = this;
                const userId = localStorage.getItem('userId');
                myAxios.get(`post/getPostByUserId?userId=${userId}&curPage=1&pageSize=10`)
                    .then(function (res) {
                        that.dataList = res.data;
                        // console.log(that.dataList)
                    })
            },
            getTags() {
                const that = this;
                myAxios.get('/tag/getTags')
                    .then(function (res) {
                        that.tags = res.data
                        console.log(that.tags)
                    })
            },
            tagChange(value) {
                this.selectActions.tags = value;
            },
            onChange(date, dateString) {
                console.log(date, dateString);
                console.log(date[0]._d)
                this.selectActions.startTime = date[0]._d;
                this.selectActions.endTime = date[1]._d;
            },
        },
    }
</script>

<style scoped>

</style>