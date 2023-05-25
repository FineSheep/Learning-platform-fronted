import VueRouter from 'vue-router'
import LayOut from "@/components/layout/LayOut";
import crawList from "@/components/case/crawList/index"
import personCenter from "@/components/person/PersonCenter"
import editPerson from '@/components/search/EditPerson'
import LoginRegister from "@/components/person/LoginRegister";
import PersonInfo from "@/components/person/update/PersonInfo";
import AccountSetting from "@/components/person/update/AccountSetting";
import webIndex from "@/components/WebIndex";
import PracticeIndex from "@/components/practice/index/PracticeIndex";
import PersonPractice from "@/components/practice/index/PersonPractice";
import PK from "@/components/practice/PK/PK";
import ResultSuccess from "@/components/result/ResultSuccess";
import PostSpecific from "@/components/post/PostSpecific";
import PKExercise from "@/components/practice/PK/PKExercise";
import DoQuestions from "@/components/practice/individual/DoQuestions";
import PostNews from "@/components/post/PostNews";
import PersonPost from "@/components/person/menu/PersonPost";
import PersonThumb from "@/components/person/menu/PersonThumb";
import PersonCollect from "@/components/person/menu/PersonCollect";
import ContentManager from "@/components/postCenter/manager/ContentManager";
import MailIndex from "@/components/mail/MailIndex";
import CommentIndex from "@/components/mail/comment/CommentIndex";
import ThumbAndCollectIndex from "@/components/mail/thumbAndCollect/ThumbAndCollectIndex";
import SystemIndex from "@/components/mail/system/SystemIndex";
import RecordIndex from "@/components/practice/record/RecordIndex";
import PKRecordIndex from "@/components/practice/record/PKRecordIndex";
import ArticleCreate from "@/components/postCenter/create/ArticleCreate";
import caseIndex from "@/components/case/card/index"
const routes = [

    {
        component: LayOut,
        path: '/',
        children:
            [
                {
                    component: MailIndex,
                    path: '/mail',
                    children: [
                        {
                            component: CommentIndex,
                            path: '',
                            meta: {title: '消息'}
                        },
                        {
                            component: ThumbAndCollectIndex,
                            path: 'thumbAndCollect',
                            meta: {title: '点赞、收藏'}
                        },
                        {
                            component: SystemIndex,
                            path: 'system',
                            meta: {title: '系统通知'}
                        }
                    ]
                },
                {
                    component: webIndex,
                    path: '/',
                    meta: {title: '首页'}
                },
                {
                    component: caseIndex,
                    path: '/index',
                    meta: {title: '首页'}
                },
                {
                    component: PostSpecific,
                    path: '/post',
                    meta: {title: '文章'}
                },
                {
                    component: PostNews,
                    path: "/postNews",
                    meta: {title: '资讯'}
                },
                {
                    component: personCenter,
                    path: '/personCenter',
                    children: [
                        {
                            component: PersonPost,
                            path: "",
                            meta: {title: '个人中心'}
                        },
                        {
                            component: PersonThumb,
                            path: 'personThumb',
                            meta: {title: '点赞'}
                        }, {
                            component: PersonCollect,
                            path: 'personCollect',
                            meta: {title: '收藏'}
                        }
                    ]
                },
                {
                    component: crawList,
                    path: '/news',
                    meta: {title: '资讯'}
                },
                {
                    component: ContentManager,
                    path: '/content',
                    meta: {title: '创作中心'}
                },
                {
                    component: PracticeIndex,
                    path: '/practiceIndex',
                    children: [
                        {
                            component: PersonPractice,
                            path: '',
                            meta: {title: '练习'}
                        },
                        {
                            component: PK,
                            path: 'pk',
                            meta: {title: '对战'}
                        },
                    ]
                },
                {
                    component: editPerson,
                    path: '/editPerson',
                    children:
                        [
                            {
                                component: PersonInfo,
                                path: '',
                                meta: {title: '修改信息'}
                            },
                            {
                                component: AccountSetting,
                                path: 'accountSetting',
                                meta: {title: '账户修改'}
                            }]
                },
            ]

    },
/*    {
        component: webIndex,
        path: "/",
        meta: {title: '首页'}
    },*/
    {
        component: RecordIndex,
        path: '/record',
        meta: {title: '做题记录'}
    },
    {
        component: PKRecordIndex,
        path: '/pkRecord',
        meta: {title: '做题记录'}
    },
    {
        component: LoginRegister,
        path: '/LoginRegister',
        meta: {title: '登录'}
    },
    {
        component: ArticleCreate,
        path: '/writeArticle',
        meta: {title: '写文章'}
    },
    {
        component: ResultSuccess,
        path: '/successful',
        meta: {title: '结果'}
    },

    {
        component: DoQuestions,
        path: '/questions',
        meta: {title: '练习'}
    },
    {
        component: PKExercise,
        path: '/pkExercise',
        meta: {title: '对战'}
    },


]

const router = new VueRouter({
    routes: routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title ='识骗-'+to.meta.title
    }
    next();
})
export default router