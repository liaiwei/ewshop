import { createRouter, createWebHashHistory } from 'vue-router'
const Home = ()=>import('@/views/home/Home.vue')
const Category = ()=>import('@/views/category/Category.vue')
const Detail = ()=>import('@/views/detail/Detail.vue')
const Profile = ()=>import('@/views/profile/Profile.vue')
const Shopcar = ()=>import('@/views/shopcar/ShopCar.vue')
const Register = ()=>import('@/views/profile/Register.vue')
const Login = ()=>import('@/views/profile/Login.vue')

const routes = [
  {
    path: '/',
    name: 'defaultHome',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      title:'图书兄弟首页'
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta:{
      title:'商品分类'
    }
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    component: Shopcar,
    meta:{
      title:'购物车'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
    meta:{
      title:'商品详情'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta:{
      title:'用户中心'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta:{
      title:'用户注册'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      title:'登录'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
next();
 document.title = to.meta.title;

})
export default router
