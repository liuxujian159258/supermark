import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from '../views/cart/Cart'
import Category from '../views/category/Category'
import Home from '../views/home/Home'
import Profile from '../views/profile/Profile'
import Detail from '../views/detail/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
// 挂载路由导航
// 前置守卫（guard）
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从那个路径跳转而来
  // next 函数 表示放行
  // next（）放行 next（‘/login’）强制跳转
  // if (to.path !== '/home') return next('/home')
  console.log('++++')
  next()
})

// 后置钩子（hook）
router.afterEach((to, from) => {
  console.log('----')
})
export default router
