import Vue from 'vue'
import Router from 'vue-router'

// 一级路由
import Register from '../components/Register'
import Menu from '../components/Menu'
import Login from '../components/Login'
import Home from '../components/Home'
import Admin from '../components/Admin'
import About from '../components/about/About.vue'

// 二级路由
import Delivery from '../components/about/Delivery.vue'
import File from '../components/about/File.vue'
import News from '../components/about/News.vue'
import Contact from '../components/about/contact/Contact.vue'

//三级路由
import Name from '../components/about/contact/Name.vue'
import Phone from '../components/about/contact/Phone.vue'

Vue.use(Router)

/* 
 * 1. 点击 router-link （下面用 a 标签代替）标签后，该标签可以得 router-link-active 和 touter-link-exact-active 两个类,
 * 并且取消同一级的 a 标签的这两个类
 * 
 * path 的设置。以 news 为例可以，可以写成 path: '/news'、 path: 'news'、 '/fahter/news
 * 第一种是绝对路径，一级路由推荐写法；子路由中使用的话，点击子路由的 a 标签时会取消父级的两个类
 * 第二种是相对路径，不推荐在一级路由中使用；在子路由中，会默认在父级路径后面添加该 news 路径，父级会保留第一个类，
 * 第三种是绝对路径，子路由中使用，路径中有父级路径，所以父级会保留第一个类
 * 
 * 如果父级路由用了重定向（一般是定向到子路由），假如定向到 '/father/news',访问他的时候其实就是访问了'father/news，
 * 'father/news' 会有两个类，并且传递给父级，
 * 如果再访问'father/news'同级的 a 标签，及时这个 a 标签使用的是上面说到的第三种写法，父级也会取消两个类，
 * 因为就向前面 1 说的，它会取消同级的 a 标签的两个类，'father/news'没有这个两个类，那么父级也没有这两个类
 */
const router = new Router({
  routes: [
    {path: '/home', name: 'homeLink', 
      // 路由的复用（<router-view name=''>,default默认路径
      components : {default: Home, file: File, news: News},
      // 路由独享守卫
      // beforeEnter : (to, from, next) =>{
      //   alert('非登录状态，不能访问此页面');
      //   next('/login');
      // }   
    },
    {path: '/menu', name: 'menuLink', component: Menu},
    {path: '/admin', name: 'adminLink', component: Admin},
    {path: '/login', name: 'loginLink', component: Login},
    {path: '/register', name: 'registerLink', component: Register},
    {path: '/about', name: 'aboutLink',  component: About,
      // redirect:{name:'newsLink'},  
      //  二级路由 
      children : [
        {path : 'news', name : 'newsLink', component : News,},
        {path : 'file', name : 'fileLink', component : File, },                      
        {path : 'delivery', name : 'deliveryLink', component : Delivery}, 
        {path : 'contact', name : 'contactLink', component : Contact,
        // 三级路由
          children: [
            {path: 'name', name : 'nameLink', component: Name, }, 
            {path: 'phone', name : 'phoneLink', component: Phone},
          ]
        },
        {path : '/about/*', redirect: 'news'},   
      ]
    },
    {path: '*', redirect: {name: 'homeLink'}}, // redirect重定向
  ],
  mode : 'history',

  // 路由值滚动行为
  scrollBehavior(to, from, savedPosition){
  //   return{x : 0, y : 80}  跳转路由时滚动条向下滚动100px的位置
      // return{selector : '.btn'}     跳转路由时滚动条向下滚动到.btn的位置

  },
})

// 全局前置守卫
// router.beforeEach((to, from, next) =>{
//   if(to.path == '/login' || to.path == '/register'){
//     next()
//   }else{
//     alert("还没登录请先登录")
//     next('/login')
//   }
// })

// 全局后置钩子
// router.afterEach((to, from) => {
//   alert('确定离开吗')
// })

export default router

