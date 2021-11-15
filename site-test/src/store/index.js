import { createStore } from 'vuex'

import {userStore} from './userStore.js'
import {postStore} from './postStore.js'

// import router from "../router/index.js"
// const userStore = {
//   namespaced: true,
// }
export default createStore({
  state: {
    status:'',
    loader:null,
  // c'est ici qu'on declare les etats, un peu comme data
  },

  mutations: {
    // set post Com Data

    setLoader(state,value){
      state.loader=value
    }

    
  },
  getters:{}

  ,
  actions: {
//  test change loader
    // {commit},query
    changeLoader (){

    }

  },
  modules: {
      userStore: userStore,  
      postStore: postStore,  

  
  }
})


// apres avoir indiquer un 'name' dans le state,
// on peux acceder a ses données dans un composant via:
//  data(){
//   return{
//     data: this.$store.state.name
// } }