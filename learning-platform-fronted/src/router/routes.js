import VueRouter from 'vue-router'
import LayOut from "@/components/layout/LayOut";
import ListCard from "@/components/case/ListCard";
import personCenter from "@/components/person/PersonCenter"
import editPerson from '@/components/person/EditPerson'
import LoginRegister from "@/components/person/LoginRegister";
import PersonInfo from "@/components/person/PersonInfo";
import AccountSetting from "@/components/person/AccountSetting";
import ListNews from "@/components/case/ListNews";
import ListView from "@/components/ListView";
import PracticeIndex from "@/components/practice/PracticeIndex";
import PersonPractice from "@/components/practice/PersonPractice";
import PK from "@/components/practice/PK";

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
                },
                {
                    component: PracticeIndex,
                    path: '/practiceIndex',
                    children: [
                        {
                            component: PersonPractice,
                            path: ''
                        }, {
                            component: PK,
                            path: 'pk'
                        },
                    ]
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