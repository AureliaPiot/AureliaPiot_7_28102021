import { createStore } from 'vuex'

import {userStore} from './userStore.js'
import {postStore} from './postStore.js'


export default createStore({
  state: {
    loader:null,
  // c'est ici qu'on declare les etats, un peu comme data
  },

  mutations: {
    // set post Com Data

  },
  getters:{}

  ,
  actions: {
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