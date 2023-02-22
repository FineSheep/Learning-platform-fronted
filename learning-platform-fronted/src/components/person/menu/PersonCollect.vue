<template>
    <div>
        <div v-if="!isEmpty" style="padding: 20px">
            <data-list type="collect" :data-list="data"/>
        </div>
        <div class="empty" v-else>
            <a-empty/>
        </div>
    </div>
</template>

<script>
    import myAxios from "@/axios/myAxios";
    import DataList from "@/components/person/menu/DataList";

    export default {
        name: "PersonCollect",
        components: {DataList},
        data() {
            return {
                isEmpty: false,
                curPage: 0,
                pageSize: 10,
                data: []
            }
        },
        created() {
            this.getThumb()
        },
        methods: {
            getThumb() {
                const that = this;
                myAxios.get(`post/getPostCollect?curPage=${this.curPage}&pageSize=${this.pageSize}`)
                    .then(function (res) {
                        if (res.data.length == 0) {
                            that.isEmpty = true;
                        } else {
                            that.data = res.data
                        }
                    })
            },
        }
    }
</script>

<style scoped>
    .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
    }
</style>