// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';//elements组件
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';//资源请求插件
import axios from 'axios';//引入axios
import Vuex from 'vuex'


Vue.prototype.axios = axios//挂载到vue原型链上
Vue.use(VueResource)
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false

//[3]创建一个store实例
const store=new Vuex.Store({
    state:{//[4]所有组件共用数据存放处
      userName: ''
    }
  })

/*入口文件*/
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// Vue.filter("details",function(value){
//   return value.slice(0,2)+"...";
// })
