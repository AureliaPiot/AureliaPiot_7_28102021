import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Sign from '../views/Sign.vue'


const routes = [
  // {
  //   mode: 'history',
  // },
  {
   path:'/',
   redirect:'/sign'
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
  },
  // protection authentification
  {
    path: '/home',
    name: 'Home',
    // children: [
    //   {
    //     // UserProfile will be rendered inside User's <router-view>
    //     // when /user/:id/profile is matched
    //     path: '',
    //     // component: UserProfile
    //     component: () => import('../components/home/post/getPost_home.vue')
    //   },
    //   {
    //     // UserProfile will be rendered inside User's <router-view>
    //     // when /user/:id/profile is matched
    //     path: '/new/post',
    //     // component: UserProfile
    //     component: () => import('../components/home/post/new_post.vue')
    //   },
    // ],

    meta: {
      reqAuth: true,
      // isAdmin: true
    },
 
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },

  // {
  //   path: '/new/post',
  //   name: 'NewPost',
  //   meta: {
  //     reqAuth: true,
  //     // isAdmin: true
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (home.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  // },

  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',

    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
},
  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})




// [Meta action]
// sur toute les routes:

// // si la route, contient la meta "reqAuth" alors -------------
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.reqAuth)) {

//     if (localStorage.getItem('token') == null) {
//       next({
//         name:'sign',
//         path: '/Sign',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//        // let user = JSON.parse(localStorage.getItem('user'))
//       next() }

// // si la route, contient la meta "isAdmin" alors -------------
//       if (to.matched.some(record => record.meta.isAdmin)) {
//       let user = JSON.parse(localStorage.getItem('user'))

//         if (user.admin == 1) {
//           next()
//         } else {
//           next({ name: 'Home' })
//         }
        
// // si la route,ne contient aucune meta -------------

//       } else {
//         next()
//       }
//     }


//   // } 
// })
// // "to" c'est là où l'user veux aller
// // "from" c'est là d'où il viens
// // "next()" c'est la fonction callBack pour continuer (/accepter) la requete de l'user

export default router
