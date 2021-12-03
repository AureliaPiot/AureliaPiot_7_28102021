import router from "../router/index.js"
import axios from 'axios'

export const userStore ={
  
  namespaced: true,

  state: {
    // User data
    name: "userStore",
    // loading: true,

    storage:{
      userId: null,
      userRole: null,
      token: null
    },

    user:null,
    userProfile:null,

    searchUsers:[],
    // // liste

  },

  mutations: {
  // setLoad(state,value){
  //   state.loading = value
  //   },

    // setStatus(state,status){
    //   state.status =status;
    // },
    setUser(state,value){
      state.user = value
    },
    setUserProfile(state,value){
      state.userProfile = value
    },

    setUserList(state,value){
      state.searchUsers = value
    },
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
                if(value.error){
                  return alert(value.error)
                }
                console.log('userSign');
                console.log(userSign.email);

                dispatch('login', {email : userSign.email, password : userSign.password})                  
            })
            .catch(function(){
                console.log('erreur de creation de compte');


            })
    },//Sign

///////////////////////////////////////////////////////////////////

    login: (_, userLogin)=>{

      // commit('setStatus','loading');
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
              // console.log(value);
              localStorage.setItem("token",value.token);
              localStorage.setItem("userId",value.userId);
              localStorage.setItem("role",value.userRole);

              router.push({path:"home"})

              console.log("connexion autoriser");
              return
          }
          console.log("connexion non autoriser");
          alert(value.message);

      })
      .catch(function(){
          console.log('erreur de connexion');
      })

    },//Login

///////////////////////////////////////////////////////////////////

    logOut(){
      localStorage.clear();
      router.push({path:"/sign"});
    },

///////////////////////////////////////////////////////////////////

    getUserData({commit},value){
      // console.log('getUser')
      axios.get('http://localhost:3000/api/user/'+value,{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
                console.log('get current user data');

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
    // console.log(value)
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
  UpdateUserName({dispatch},data){
    console.log('user bio update')
    axios.put('http://localhost:3000/api/user/name/'+data.id,data.form,{
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
    UpdateUserRole({dispatch},data){
    console.log('user role update')
    axios.put('http://localhost:3000/api/user/role/'+data.id,data.form,{
              headers: {
                  "authorization" : 'Bearer ' + localStorage.getItem('token'),
                  },
          }) 
          .then(function(response) {
            console.log(response.data);
            // commit("setRole",data.form.role) 
            if(data.id == localStorage.getItem('userId')){
              localStorage.setItem('role', data.form.role)
            }
            dispatch('getUserProfile',data.id)
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

            dispatch('getUserData',data.id);
            dispatch('getUserProfile',data.id);
            dispatch('postStore/getPost','user/'+data.id,{root:true})
            dispatch('postStore/getComs', null, {root:true})

            })
            .catch(function (error) {
                console.log(error);
            });
      },
///////////////////////////////////////////////////////////////////
    UpdateUserDeletePic({dispatch },data){
      // commit('setLoad',false)

      console.log('user update')
      axios.put('http://localhost:3000/api/user/delete/file/'+data.id,data.form,{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
              console.log(response.data);
              // commit('setLoad',true)

              dispatch('getUserData',data.id);

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

  searchUser({commit},data){
    console.log('search user')
    axios.get('http://localhost:3000/api/user/search/'+data,{
              headers: {
                  "authorization" : 'Bearer ' + localStorage.getItem('token'),
                  },
          }) 
          .then(function(response) {
            commit('setUserList',response.data)
            // console.log(response.data);

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
