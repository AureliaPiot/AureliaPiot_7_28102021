

import { createStore } from 'vuex'

export default createStore({
  state: {
    name: "getUsers"
  },
  mutations: {
  },
  actions: {
    login: ({commit}, userLogin)=>{
      commit;
      console.log('sign');
      console.log(userLogin);
      // 'commit' reçois les donnée evoyer depuis le fichier qui l'appele (un objet)
      // 'userLogin' est la denomination de cet objet
      // puis on ecrits l'action que l'on veux executé
      fetch('http://localhost:3000/api/user/login', {
          method : "Post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userLogin),
      }) 
      .then(function(res){
          return res.json();
      })    
      .then(function(value){
          if(value.token){
              // console.log(value);
              localStorage.setItem("token",value.token);
              localStorage.setItem("userId",value.userId);
              localStorage.setItem("role",value.userRole);
          }
          console.log(value.message);
      })
      .catch(function(){
          console.log('erreur de connexion');
      })

    }//Login
    ,
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