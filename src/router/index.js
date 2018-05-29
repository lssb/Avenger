import Vue from 'vue'
import Router from 'vue-router'
import Avenger from '@/components/Avenger'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Avenger',
      component: Avenger
    }
  ]
})
