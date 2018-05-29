// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import VueLodash from 'vue-lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJsonp from 'vue-jsonp'

const options = { name: 'lodash' }
Vue.use(VueLodash, options)

Vue.use(VueAxios, axios)
Vue.use(VueJsonp)
// Vue.use(VueResource)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
