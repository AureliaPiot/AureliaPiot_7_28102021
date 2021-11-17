import router from "../router/index.js"
import axios from 'axios'

export const userStore ={
  
  namespaced: true,

  state: {
    // User data
    name: "userStore",
    loading: true,
    storage:{
      userId: localStorage.getItem('userId'),
      userRole: localStorage.getItem('role'),
      token: localStorage.getItem('token'),
    },

    user:null,
    userProfile:null,

  },

  mutations: {
  setLoad(state,value){
    state.loading = value
    },

    setStatus(state,status){
      state.status =status;
    },
    setUser(state,value){
      state.user = value
    },
    setUserProfile(state,value){
      state.userProfile = value
    },

    setRole(state,value){
      state.storage.userRole = value
    }
  },


  actions: {
    Sign: ({dispatch}, userSign)=>{
      console.log('Sign');

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

              localStorage.setItem("token",value.token);
              localStorage.setItem("userId",value.userId);
              localStorage.setItem("role",value.userRole);

              router.push("home");

              console.log("connexion autoriser");
              return
          }
          console.log("connexion non autoriser");

      })
      .catch(function(){
          console.log('erreur de connexion');
      })

    },//Login

///////////////////////////////////////////////////////////////////

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
  getUserProfile({commit},value){
    console.log('getProfile')

    console.log(value)
    axios.get('http://localhost:3000/api/user/'+value,{
              headers: {
                  "authorization" : 'Bearer ' + localStorage.getItem('token'),
                  },
          }) 
          .then(function(response) {
              console.log('get user profile');

              console.log(response.data);
              commit('setUserProfile',response.data)
          })
          .catch(function (error) {
              console.log(error);
          });
  },
///////////////////////////////////////////////////////////////////
    UpdateUserBio({dispatch},data){
      console.log('user bio update')
      axios.put('http://localhost:3000/api/user/bio/'+data.id,data.form,{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
                console.log(response.data);
                dispatch('getUserProfile',data.id);


            })
            .catch(function (error) {
                console.log(error);
            });
    },
///////////////////////////////////////////////////////////////////
    UpdateUserRole({commit,dispatch},data){
    console.log('user role update')
    axios.put('http://localhost:3000/api/user/role/'+data.id,data.form,{
              headers: {
                  "authorization" : 'Bearer ' + localStorage.getItem('token'),
                  },
          }) 
          .then(function(response) {
            console.log(response.data);
            localStorage.setItem('role', data.form.role),
            commit("setRole",data.form.role) 
            dispatch('getUserData',data.id)
            dispatch('postStore/getPost','user/'+data.id,{root:true})
            dispatch('postStore/getComs', null, {root:true})

          })
          .catch(function (error) {
              console.log(error);
          });
    },
///////////////////////////////////////////////////////////////////
    UpdateUserProfilePic({dispatch},data){
      console.log('user update')
      axios.put('http://localhost:3000/api/user/file/'+data.id,data.form,{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
              console.log(response.data);
            dispatch('getUserProfile',data.id);
            dispatch('postStore/getPost','user/'+data.id,{root:true})
            dispatch('postStore/getComs', null, {root:true})

            })
            .catch(function (error) {
                console.log(error);
            });
      },
///////////////////////////////////////////////////////////////////
    UpdateUserDeletePic({dispatch ,commit},data){
      commit('setLoad',false)

      console.log('user update')
      axios.put('http://localhost:3000/api/user/delete/file/'+data.id,data.form,{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
              console.log(response.data);
              commit('setLoad',true)

              dispatch('getUserProfile',data.id);
              dispatch('postStore/getPost','user/'+data.id,{root:true})
              dispatch('postStore/getComs', null, {root:true})

            })
            .catch(function (error) {
                console.log(error);
            });
      },
///////////////////////////////////////////////////////////////////

    deleteUser({dispatch},data){
      console.log('delete user')
      axios.delete('http://localhost:3000/api/user/'+data.id,{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
              console.log(response.data);
              dispatch('logOut');
            })
            .catch(function (error) {
                console.log(error);
            });
      },
///////////////////////////////////////////////////////////////////
  
  },
  modules: {
  },
  

}
