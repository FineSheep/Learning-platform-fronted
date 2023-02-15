import VueRouter from 'vue-router'
import LayOut from "@/components/layout/LayOut";
import ListCard from "@/components/case/ListCard";
import personCenter from "@/components/person/PersonCenter"
import editPerson from '@/components/search/EditPerson'
import LoginRegister from "@/components/person/LoginRegister";
import PersonInfo from "@/components/person/update/PersonInfo";
import AccountSetting from "@/components/person/update/AccountSetting";
import ListNews from "@/components/case/ListNews";
import ListView from "@/components/ListView";
import PracticeIndex from "@/components/practice/index/PracticeIndex";
import PersonPractice from "@/components/practice/index/PersonPractice";
import PK from "@/components/practice/PK/PK";
import WriteArticle from "@/components/postCenter/create/WriteArticle";
import ResultSuccess from "@/components/result/ResultSuccess";
import PostSpecific from "@/components/post/PostSpecific";
import PKExercise from "@/components/practice/PK/PKExercise";
import DoQuestions from "@/components/practice/individual/DoQuestions";
import PostNews from "@/components/post/PostNews";
import PersonPost from "@/components/person/menu/PersonPost";
import PersonThumb from "@/components/person/menu/PersonThumb";
import PersonCollect from "@/components/person/menu/PersonCollect";
import ContentManager from "@/components/postCenter/manager/ContentManager";

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
                    component: PostSpecific,
                    path: '/post'
                },
                {
                    component: PostNews,
                    path: "/postNews"
                },
                {
                    component: personCenter,
                    path: '/personCenter',
                    children: [
                        {
                            component: PersonPost,
                            path: ""
                        },
                        {
                            component: PersonThumb,
                            path: 'personThumb'
                        }, {
                            component: PersonCollect,
                            path: 'personCollect'
                        }
                    ]
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
                    component: ContentManager,
                    path: '/content'
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
                        },
                        {
                            component: PK,
                            path: 'pk'
                        },
                    ]
                },

            ]

    },
    {
        component: LoginRegister,
        path: '/LoginRegister'
    },
    {
        component: WriteArticle,
        path: '/writeArticle'
    },
    {
        component: ResultSuccess,
        path: '/successful'
    },

    {
        component: DoQuestions,
        path: '/questions/:userId/:difficulty/:source/:sum',
    },
    {
        component: PKExercise,
        path: '/pkExercise'
    }


]

const router = new VueRouter({
    routes: routes
})

export default router