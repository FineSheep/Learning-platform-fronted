import VueRouter from 'vue-router'
import LayOut from "@/components/layout/LayOut";
import ListCard from "@/components/pages/ListCard";
import practiseQues from "@/components/pages/practiseQues";
import personCenter from "@/components/pages/person/PersonCenter"
import editPerson from '@/components/pages/person/EditPerson'
import LoginRegister from "@/components/pages/person/LoginRegister";

const routes = [

    {
        component: LayOut,
        path: '/',
        children:
            [
                {
                    component: ListCard,
                    path: 'index'
                },
                {
                    component: practiseQues,
                    path: 'practice'
                },
                {
                    component: personCenter,
                    path: 'personCenter'
                },
            ]

    },
    {
        component: LoginRegister,
        path: '/LoginRegister'
    },
    {
        component: editPerson,
        path: '/editPerson'
    }
]

const router = new VueRouter({
    routes: routes
})

export default router