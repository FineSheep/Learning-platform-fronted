import VueRouter from 'vue-router'
import LayOut from "@/components/layout/LayOut";
import ListCard from "@/components/case/ListCard";
import practiseQues from "@/components/pages/practiseQues";
import personCenter from "@/components/pages/person/PersonCenter"
import editPerson from '@/components/pages/person/EditPerson'
import LoginRegister from "@/components/pages/person/LoginRegister";
import PersonInfo from "@/components/pages/person/PersonInfo";
import AccountSetting from "@/components/pages/person/AccountSetting";

const routes = [

    {
        component: LayOut,
        path: '/',
        children:
            [
                {
                    component: ListCard,
                    path: ''
                },
                {
                    component: practiseQues,
                    path: 'practice'
                },
                {
                    component: personCenter,
                    path: 'personCenter'
                },
                {
                    component: editPerson,
                    path: '/editPerson',
                    children:
                        [
                            {
                                component: PersonInfo,
                                path: ''
                            },
                            {
                                component: AccountSetting,
                                path: 'accountSetting'
                            }]
                }
            ]

    },
    {
        component: LoginRegister,
        path: '/LoginRegister'
    },

]

const router = new VueRouter({
    routes: routes
})

export default router