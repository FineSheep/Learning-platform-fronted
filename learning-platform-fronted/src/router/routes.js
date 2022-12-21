import VueRouter from 'vue-router'
import UserLogin from "@/components/pages/UserLogin.vue";
import LayOut from "@/components/layout/LayOut";
import ListCard from "@/components/pages/ListCard";
import practiseQues from "@/components/pages/practiseQues";

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
                }]

    },
    {
        component: UserLogin,
        path: '/login'
    },

]

const router = new VueRouter({
    routes: routes
})

export default router