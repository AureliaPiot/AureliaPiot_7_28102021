import { createRouter, createWebHashHistory } from 'vue-router';
import Sign from '../views/Sign.vue';


const routes = [
 
  {
   path:'/',
   redirect:'/sign',
  // redirect:{name : "Sign"},

  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
  
    
    // if connected redirect to home
  },
  // protection authentification
  {
    path: '/home',
    name: 'Home',
    meta: {
      isAuth: true,
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      // they will be rendered inside User's <router-view>
      {
        path: '',
        name: 'HomePage',
        component: () => import('../components/home/main_home.vue'),
        meta: {
          isAuth: true,
        }
        
      },
      {
        path: '/user/:id',
        name: 'userPage',
        // faire un alis pour pas voir les id
        component: () => import('../components/home/profile/userProfile.vue'),
        // meta: {
        //   isAuth: true,
        // }
      },
    ],
  },


  {
    path: '/about',
    name: 'About',
    meta: {
      isAuth: true,
      // isAdmin: true
    },

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

// si la route, contient la meta "isAuth" alors -------------
// const role = localStorage.getItem('role');
// const token = localStorage.getItem('token');


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.isAuth)) {
//     if (token == null) 
//       { next({ name:'Sign'})} 
//     else 
//       {next()}
//   }

// si la route, contient la meta "isAdmin" alors -------------
  // if (to.matched.some(record => record.meta.isAdmin)) {
  //   if (role == 'admin') 
  //     {next()} 
  //   else 
  //     {next({ name: 'Home' })}
  //     // redirection vers home
  // } 
// si la route,ne contient aucune meta ------------
//   else {
//     next()
//   }

// })
// "to" c'est là où l'user veux aller
// "from" c'est là d'où il viens
// "next()" c'est la fonction callBack pour continuer (/accepter) la requete de l'user

export default router
