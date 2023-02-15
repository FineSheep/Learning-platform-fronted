<template>
    <div>
        <a-space>
            <a-range-picker @change="onChange" :locale="locale" style="width: 200px"/>
            <a-select
                    mode="multiple"
                    style="width: 200px"
                    placeholder="请选择标签"
            >
                <a-select-option v-for="item in tags" :key="item.id" >
                    {{item.tagName}}
                </a-select-option>
            </a-select>
        </a-space>
    </div>
</template>

<script>
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import myAxios from "@/axios/myAxios";

    export default {
        name: "ContentManager",
        data() {
            return {
                locale,
                tags: []
            }
        },
        mounted() {
            this.getTags()
        },
        methods: {
            getTags() {
                const that = this;
                myAxios.get('/tag/getTags')
                    .then(function (res) {
                        that.tags = res.data
                    })

            },
            onChange(date, dateString) {
                console.log(date, dateString);
            },
        },
    }
</script>

<style scoped>

</style>