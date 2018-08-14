import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'

import Dashboard from './views/Dashboard.vue'
import Library from './views/Library.vue'
import Datastore from './views/Datastore'
import Endpoints from './views/Endpoints.vue'
import Modules from './views/Modules.vue'
import Vault from './views/Vault.vue'
import Settings from './views/Settings.vue'

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
      path: '/library',
      name: 'library',
      component: Library
    },
    {
      path: '/datastore',
      name: 'datastore',
      component: Datastore
    },
    {
      path: '/endpoints',
      name: 'endpoints',
      component: Endpoints
    },
    {
      path: '/modules',
      name: 'modules',
      component: Modules
    },
    {
      path: '/vault',
      name: 'vault',
      component: Vault
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
