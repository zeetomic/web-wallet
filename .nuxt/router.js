import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0b1f9a6e = () => interopDefault(import('../pages/accountconfirmation/index.vue' /* webpackChunkName: "pages/accountconfirmation/index" */))
const _8e8255ce = () => interopDefault(import('../pages/activity/index.vue' /* webpackChunkName: "pages/activity/index" */))
const _226ae615 = () => interopDefault(import('../pages/changepassword/index.vue' /* webpackChunkName: "pages/changepassword/index" */))
const _b4fed690 = () => interopDefault(import('../pages/changepins/index.vue' /* webpackChunkName: "pages/changepins/index" */))
const _1b9501dc = () => interopDefault(import('../pages/forgetpassword/index.vue' /* webpackChunkName: "pages/forgetpassword/index" */))
const _2c23214a = () => interopDefault(import('../pages/getwallet/index.vue' /* webpackChunkName: "pages/getwallet/index" */))
const _eab521c0 = () => interopDefault(import('../pages/history/index.vue' /* webpackChunkName: "pages/history/index" */))
const _f8abc816 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _69d3e090 = () => interopDefault(import('../pages/loginbyphone/index.vue' /* webpackChunkName: "pages/loginbyphone/index" */))
const _55270416 = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _3721a6af = () => interopDefault(import('../pages/receive/index.vue' /* webpackChunkName: "pages/receive/index" */))
const _43b0d736 = () => interopDefault(import('../pages/resetpassword/index.vue' /* webpackChunkName: "pages/resetpassword/index" */))
const _07c9e51c = () => interopDefault(import('../pages/scaninvoice/index.vue' /* webpackChunkName: "pages/scaninvoice/index" */))
const _13a85dd2 = () => interopDefault(import('../pages/send/index.vue' /* webpackChunkName: "pages/send/index" */))
const _2d5fbba2 = () => interopDefault(import('../pages/signup/index.vue' /* webpackChunkName: "pages/signup/index" */))
const _6c6a392a = () => interopDefault(import('../pages/signupbyphone/index.vue' /* webpackChunkName: "pages/signupbyphone/index" */))
const _3f41cdc3 = () => interopDefault(import('../pages/verify/index.vue' /* webpackChunkName: "pages/verify/index" */))
const _28b1204a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/accountconfirmation",
    component: _0b1f9a6e,
    name: "accountconfirmation"
  }, {
    path: "/activity",
    component: _8e8255ce,
    name: "activity"
  }, {
    path: "/changepassword",
    component: _226ae615,
    name: "changepassword"
  }, {
    path: "/changepins",
    component: _b4fed690,
    name: "changepins"
  }, {
    path: "/forgetpassword",
    component: _1b9501dc,
    name: "forgetpassword"
  }, {
    path: "/getwallet",
    component: _2c23214a,
    name: "getwallet"
  }, {
    path: "/history",
    component: _eab521c0,
    name: "history"
  }, {
    path: "/login",
    component: _f8abc816,
    name: "login"
  }, {
    path: "/loginbyphone",
    component: _69d3e090,
    name: "loginbyphone"
  }, {
    path: "/profile",
    component: _55270416,
    name: "profile"
  }, {
    path: "/receive",
    component: _3721a6af,
    name: "receive"
  }, {
    path: "/resetpassword",
    component: _43b0d736,
    name: "resetpassword"
  }, {
    path: "/scaninvoice",
    component: _07c9e51c,
    name: "scaninvoice"
  }, {
    path: "/send",
    component: _13a85dd2,
    name: "send"
  }, {
    path: "/signup",
    component: _2d5fbba2,
    name: "signup"
  }, {
    path: "/signupbyphone",
    component: _6c6a392a,
    name: "signupbyphone"
  }, {
    path: "/verify",
    component: _3f41cdc3,
    name: "verify"
  }, {
    path: "/",
    component: _28b1204a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
