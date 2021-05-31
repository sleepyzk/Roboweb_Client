import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"
import i18n from './i18n/index'
import bus from "./store/bus";

Vue.config.productionTip = false
Vue.use(ElementUI,{size:'small'});
Vue.prototype.$http = axios
Vue.prototype.bus = bus

new Vue({
  router,
  store,
  bus,
  i18n,
  render: h => h(App),
}).$mount('#app')
