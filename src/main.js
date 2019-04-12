import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/nl'
import VueMq from 'vue-mq'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

// Element UI
Vue.use(ElementUI, { locale })

// Vue Media queries
Vue.use(VueMq, {
  breakpoints: {
    sm: 768,
    md: 992,
    lg: 1200,
    xl: Infinity
  }
})

// Vue Resource
Vue.use(VueResource)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
