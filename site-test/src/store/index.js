

import { createStore } from 'vuex'

export default createStore({
  state: {
    name: "getUsers"
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})


// apres avoir indiquer un 'name' dans le state,
// on peux acceder a ses données dans un composant via:
//  data(){
//   return{
//     data: this.$store.state.name
// } }