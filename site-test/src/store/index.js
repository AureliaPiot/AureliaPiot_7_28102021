import { createStore } from 'vuex'

import {userStore} from './userStore.js'
// import router from "../router/index.js"
// const userStore = {
//   namespaced: true,
// }
export default createStore({
  state: {
    name: "getStore",
    status:'',
  // c'est ici qu'on declare les etats, un peu comme data
  },
  mutations: {
  },
  getters:{}
  ,
  actions: {

  },
  modules: {
      userStore: userStore,  
  
  }
})


// apres avoir indiquer un 'name' dans le state,
// on peux acceder a ses données dans un composant via:
//  data(){
//   return{
//     data: this.$store.state.name
// } }