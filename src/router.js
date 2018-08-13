import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import SharedCode from './views/SharedCode.vue'
import PersistentData from './views/PersistentData'
import Endpoints from './views/Endpoints.vue'
import Tools from './views/Tools.vue'
import Settings from './views/Settings.vue'
import Login from './views/Login.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/code',
      name: 'shared-code',
      component: SharedCode
    },
    {
      path: '/data',
      name: 'persistent-data',
      component: PersistentData
    },
    {
      path: '/endpoints',
      name: 'endpoints',
      component: Endpoints
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.loggedIn && to.name !== 'login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
