import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "@/router/routes";
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(VueRouter)

//注入全局属性$message
import { message} from 'ant-design-vue'
Vue.prototype.$message = message;
message.config({
    duration: 2,// 持续时间
    top:`100px`, // 到页面顶部距离
    maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
