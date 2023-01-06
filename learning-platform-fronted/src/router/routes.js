import VueRouter from 'vue-router'
import LayOut from "@/components/layout/LayOut";
import ListCard from "@/components/case/ListCard";
import personCenter from "@/components/pages/person/PersonCenter"
import editPerson from '@/components/pages/person/EditPerson'
import LoginRegister from "@/components/pages/person/LoginRegister";
import PersonInfo from "@/components/pages/person/PersonInfo";
import AccountSetting from "@/components/pages/person/AccountSetting";
import ListNews from "@/components/case/ListNews";
import ListView from "@/components/ListView";

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
                    component: personCenter,
                    path: 'personCenter'
                },
                {
                    component: ListNews,
                    path: '/news'
                },
                {
                    component: ListView,
                    path: "/test"
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