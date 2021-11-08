

import { createStore } from 'vuex'

export default createStore({
  state: {
    name: "getStore"
  },
  mutations: {
  },
  actions: {
    Sign: ({commit}, userSign)=>{
      commit;
      // 'commit' reçois les donnée evoyer depuis le fichier qui appele l'action (un objet)
      // 'userSign' est la denomination de cet objet
      // puis on ecrits l'action que l'on veux executé
      console.log('Sign');
      console.log(userSign);
      
            fetch('http://localhost:3000/api/user/sign', {
                method : "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userSign),
            }) 
            .then(function(res){
                    return res.json();
            })    
            .then(function(value){
                    console.log(value.message);
                   this.$router.replace({ name: "home" });
            })
            .catch(function(){
                console.log('erreur de creation de compte');
            })
    },//Sign


    login: ({commit}, userLogin)=>{
      commit;
      console.log('sign');
      console.log(userLogin);

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