import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PostsManager from '@/components/PostsManager'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
    issuer: 'https://dev-817121.oktapreview.com/oauth2/default',
    client_id: '0oaepwtb7nsop7Pin0h7',
    redirect_uri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email'
})
  Vue.use(Router)
  let router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Hello',
        component: Hello
},
{
        path: '/implicist/callback',
        component: Auth.handleCallback()
      },
      {
        path: '/posts-manager',
        name: 'PostsManager',
        component: PostsManager,
        meta: {
          requiresAuth: true
        }
} ]
  })
  router.beforeEach(Vue.prototype.$auth.authRedirectGuard())
  export default router
  