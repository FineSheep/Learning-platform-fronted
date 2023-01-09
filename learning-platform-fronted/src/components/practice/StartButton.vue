<template>
    <div>
        <a-button type="primary" @click="showModal">
            开始训练吧
        </a-button>
        <a-modal v-model="visible" title="Basic Modal" @ok="handleOk" ok-text="确认" cancel-text="取消">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: "StartButton",
        data() {
            return {
                visible: false,
            }
        },
        methods: {
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                console.log(e);
                this.visible = false;
            },
        },
    }
</script>

<style scoped>

</style>