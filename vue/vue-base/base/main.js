//导入css
import './index.css';
//导入Vue框架
import Vue from 'vue';
//导入app.vue组件
import App from './app.vue';


//创建Vue根实例
new Vue({
    el:"#app",
    router:router,
    render:h => h(App)  //等于function(h){return h(App)}
})