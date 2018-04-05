//导入css
import './index.css';
//导入Vue框架
import Vue from 'vue';
//导入vue-router
import VueRouter from 'vue-router'
//导入vuex
import Vuex from 'vuex';
//导入app.vue组件
import App from './app.vue';
//导入bus
import VueBus from './vue-bus';
//导入ajax
import Ajax from './ajax';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueBus);
Vue.use(Ajax);

const Routers = [
    {
        path:'/index',
        meta:{
            title:'首页'
        },
        component:(resolve)=>require(['./views/index.vue'],resolve)
    },
    {
        path:'/about',
        meta:{
            title:'关于'
        },
        component:(resolve)=>require(['./views/about.vue'],resolve)
    },
    {
        path:'/user/:id/:name',
        meta:{
            title:'个人主页'
        },
        component:(resolve)=>require(['./views/user.vue'],resolve)
    },
    {
        path:'*',
        redirect:'/index'
    }
]

const RouterConfig ={
    //使用HTML5的History路由模式
    mode:'history',
    routes:Routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to,from,next)=>{
    window.document.title=to.meta.title;
    next();
});
router.afterEach((to,from,next)=>{
    console.log(11111);
    window.scrollTo(0, 0);
});

const moduleA={
    state:{
        text:'text',
        count:2
    },
    getters:{
        sumCount(state,getters,rootState){
            return state.count + rootState.count;
        }
    }
};

const store=new Vuex.Store({
    modules:{
        a:moduleA
    },
    state:{
        count:0,
        list:[1,5,8,10,30,50]
    },
    mutations:{
        increment(state,n=1){
            state.count+=n;
        },
        decrease(state){
            state.count--;
        }
    },
    getters:{
        filter(state){
            return state.list.filter(function(item){
                return item>=10;
            })
        },
        listCount(state,getters){
            return getters.filter.length;
        }
    },
    actions:{
        increment(context){
            context.commit('increment');
        },
        aysncIncrement(context){
            return new Promise(function(resolve){
                setTimeout(function(){
                    context.commit('increment');
                    resolve();
                },3000)
            })
        }
    }
});

//创建Vue根实例
new Vue({
    el:"#app",
    router:router,
    //使用vuex
    store:store,
    render:h => h(App)  //等于function(h){return h(App)}
})