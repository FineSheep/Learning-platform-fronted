<template>
    <a-card hoverable style="width: 100%;position: relative">
        <a-card-meta :title="user.username" :description="user.profile">
            <a-avatar
                    slot="avatar"
                    :src="user.avatarUrl"
                    :size="50"
            />

        </a-card-meta>
        <span class="right-corner">
                加入时间：{{user.createTime}}
        </span>
        <a-button @click="editPerson" style="float: right; background-color: white; color: rgb(24,144,255)"
                  type="primary">编辑个人资料
        </a-button>
    </a-card>
</template>


<script>
    import moment from 'moment'
    import userJs from "@/userJs/user"

    export default {
        name: "PersonCenter",
        data() {
            return {
                user: {},
            }
        },
        async created() {
            const user = await userJs.getCurrentUser();
            this.user = user;
            this.user.createTime = moment(new Date(this.user.createTime)).format('YYYY-MM-DD')

        },
        methods: {
            editPerson() {
                this.$router.push(
                    {
                        path: '/editPerson',
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .right-corner {
        position: absolute;
        top: 20px;
        right: 20px;
    }
</style>