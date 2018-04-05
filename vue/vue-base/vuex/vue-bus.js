const install=function(Vue){
    const Bus=new Vue({
        methods:{
            emit:function(event,...args){
                this.$emit(event,...args);
            },
            on:function(event,callback){
                this.$on(event,callback);
            },
            off:function(event,callback){
                this.$off(event,callback);
            }
        }
    })
    Vue.prototype.$bus=Bus;
}
export default install;