<template>
    <div style="position: relative">
        <div style="width: 70%;display: inline-block">
            <a-card hoverable style=" margin: 20px auto">
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
                <a-button @click="editPerson"
                          style="float: right; background-color: white; color: rgb(24,144,255);margin-top: 20px"
                          type="primary">编辑个人资料
                </a-button>
            </a-card>
            <PersonMenu/>
        </div>
        <div class="person-card">
            <person-card :post-num="user.postNum" :collect-num="user.collectNum" :thumb-num="user.thumbNum"/>
        </div>
    </div>

</template>


<script>
    import moment from 'moment'
    import userJs from "@/userJs/user"
    import PersonMenu from "@/components/person/menu/PersonMenu";
    import PersonCard from "@/components/person/update/PersonCard";

    export default {
        name: "PersonCenter",
        components: {PersonCard, PersonMenu},
        data() {
            return {
                user: {},

            }
        },
        async created() {
            const user = await userJs.getCurrentUser();
            this.user = user;
            console.log(user)
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

    .person-card {
        display: inline-block;
        width: 25%;
        top: 20px;
        right: 2%;
        position: absolute;
        background-color: #fff;
        border-radius: 20px;
    }
</style>