// IE 호환
import 'babel-polyfill'
import 'es6-promise/auto'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store'

import vuetify from './plugins/vuetify'
import axios from 'axios'
import vueHeadful from 'vue-headful'
import Croppa from 'vue-croppa'

require('./assets/css/main.scss')
require('./assets/css/vue-croppa.min.css')

Vue.use(Croppa)
Vue.prototype.$http = axios
Vue.component('vue-headful', vueHeadful)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify,
  template: '<App/>',
  render: h => h(App)
})
