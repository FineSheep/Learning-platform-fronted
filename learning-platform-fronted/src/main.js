import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "@/router/routes";
import VueRouter from 'vue-router'
import store from './store/store'
import {message} from 'ant-design-vue'
import * as socket from './socket/Socket'
//引入组件库
import jvuewheel from '@jyeontu/jvuewheel'
//引入样式
import '@jyeontu/jvuewheel/lib/jvuewhell.css'
Vue.use(jvuewheel);
Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(VueRouter)
//注入全局属性$message


Vue.prototype.$socket = socket;

Vue.prototype.$message = message;
message.config({
    duration: 2,// 持续时间
    top: `100px`, // 到页面顶部距离
    maxCount: 2 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    },
}).$mount('#app')
