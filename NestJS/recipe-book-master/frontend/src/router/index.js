import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../components/recipe/Create.vue'
import Edit from '../components/recipe/Edit.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/recipe',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '/recipe/create', name: 'create', component: Create },
  { path: '/recipe/update/:id', name: 'edit', component: Edit },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
