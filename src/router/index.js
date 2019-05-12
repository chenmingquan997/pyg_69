import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import Users from '@/components/users/Users'
import Rights from '@/components/auth/Rights'
import Roles from '@/components/auth/roles'
import Categories from '@/components/goods/Categories'
import Params from '@/components/goods/Params'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/', // 如果/是根路径  返回login
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      // 二级路由配置  将会在home组件下使用
      children: [
        { path: '/welcome', name: 'welcome', component: Welcome },
        { path: '/users', name: 'users', component: Users },
        { path: '/rights', name: 'rights', component: Rights },
        { path: '/roles', name: 'roles', component: Roles },
        { path: '/categories', name: 'categories', component: Categories },
        { path: '/params', name: 'params', component: Params }

      ]
    }
  ]

})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // to 去的路由
  // from 离开的路由对象
  // next 调用下一个路由
  // next('/xxx')
  // 默认去下一个路由 直接传参
  // console.log(to)
  // console.log(from)
  // next()
  // 1.如果现在 跳转是登录 方行
  if (to.path === '/login') return next()
  // 2.如果跳转未登录 (sessionStorage 是否  token)  拦截到登录
  if (!sessionStorage.getItem('token')) return next('/login')
  // 3.其他情况
  next()
})
export default router
