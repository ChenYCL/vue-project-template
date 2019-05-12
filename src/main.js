import Vue from 'vue'
import './plugins/apiConfig'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/mixin'
import './plugins/commonComponent'
// import './plugins/imgImport'
import scroll from 'vue-seamless-scroll'
import G2 from '@antv/g2'
Vue.prototype.$G2 = G2;
Vue.use(scroll)
Vue.config.productionTip = false

console.log(process.env.VUE_APP_BASE_API);
console.log(process.env.BASE_URL)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
