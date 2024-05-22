import { createRouter, createWebHistory } from 'vue-router'
const Home = ()=>import('@/views/Home.vue')
const Category = ()=>import('@/views/category/Category.vue')
const Detail = ()=>import('@/views/detail/Detail.vue')
const Profile = ()=>import('@/views/profile/Profile.vue')
const Shopcar = ()=>import('@/views/shopcar/ShopCar.vue')

const routes = [
  {
    path: '/',
    name: 'defaultHome',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    component: Shopcar
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
