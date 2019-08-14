// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'


Vue.config.productionTip = false

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'https://wd9086734151cepuuy.wilddogio.com/'

//全局注册组件
// import Users from './components/Users.vue'
// Vue.component('Users', Users)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render : h =>h(App)
  components: { App },
  template: '<App/>'
})



  