import router from "../router/index.js"
import axios from 'axios'

export const userStore ={
  
  namespaced: true,

  state: {
    // User data
    name: "userStore",

    storage:{
      userId: localStorage.getItem('userId'),
      userRole: localStorage.getItem('role'),
      token: localStorage.getItem('token'),
    },

    user:null,
  },

  mutations: {
 

    setStatus(state,status){
      state.status =status;
    },
    setUser(state,value){
      state.user = value
    },

    setRole(state,value){
      state.storage.userRole = value
    }
  },


  actions: {
    Sign: ({dispatch}, userSign)=>{

      // {commit} si on veut effectuer une mutation
      // {dispatch} si on veut effectuer une action 
      // 'userSign' est la denomination de l'objet recus
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

                   console.log('userSign');
                  console.log(userSign.email);

                  // this.login({
                  //   email : userSign.email,
                  //   password : userSign.password
                  // })
                dispatch('login', {email : userSign.email, password : userSign.password})                  
            })
            .catch(function(){
                console.log('erreur de creation de compte');
            })
    },//Sign

///////////////////////////////////////////////////////////////////

    login: ({commit}, userLogin)=>{

      commit('setStatus','loading');
      console.log('login');


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
              console.log(value);

              commit("logUser",value)

              localStorage.setItem("token",value.token);
              localStorage.setItem("userId",value.userId);
              localStorage.setItem("role",value.userRole);

              router.push("home");

              // self.$router.go('/home');
              console.log("connexion autoriser");
              return
          }
          console.log("connexion non autoriser");

      })
      .catch(function(){
          console.log('erreur de connexion');
      })


    },//Login
    logOut(){
      localStorage.clear();
// commit qui vide les donnée du store
      router.push({name:"Sign"});
    },
///////////////////////////////////////////////////////////////////

    getUserData({commit},value){
      // console.log(value)
      axios.get('http://localhost:3000/api/user/'+value,{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
                console.log('get user data');

                console.log(response.data);
                commit('setUser',response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    },
///////////////////////////////////////////////////////////////////

    UpdateUserBio({dispatch},data){
      console.log('store update')
      axios.put('http://localhost:3000/api/user/bio/'+data.id,data.form,{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
                console.log('get user data');

                console.log(response.data);
                dispatch('getUserData',data.id)
            })
            .catch(function (error) {
                console.log(error);
            });
    },
///////////////////////////////////////////////////////////////////

    changeRole({commit},value){
      commit("setRole",value)   
    }

  },
  modules: {
  },
  

}
