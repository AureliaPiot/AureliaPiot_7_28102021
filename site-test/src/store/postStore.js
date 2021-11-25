// import router from "../router/index.js"
import axios from 'axios'


export const postStore ={
  
  namespaced: true,

  state: {
    name: "postStore",

    loadingStatus:'not Loading',

    posts: null,
    coms: [],



  },
  getters:{
    getPosts(state){
        return state.posts.filter(post => post.UserId==1)
    },

   
},
  mutations: {
    setLoadingStatus(state,value){
        state.loadingStatus = value;
    },
    setPost(state,data){
        state.posts = data;
    },
    setComs(state,data){
        // state.coms.push(data);
        state.coms = data;

    },



    showData(value){
        console.log(value);
    }
  },

  actions: {

    getPost({commit},query){
          console.log('get post :'+ query);
          commit("setLoadingStatus",'loading')

        axios.get('http://localhost:3000/api/post/'+query, {
            headers: { 
                "Content-Type": "application/json",
                "authorization" : 'Bearer ' + localStorage.getItem('token'), 
            },
        }) 
        .then(res => {
          commit("setLoadingStatus",'notloading'),
          commit("setPost",res.data)
        })
        .catch(function(){
            console.log('erreur de requete');
        })
      },//get post


///////////////////////////////////////////////////////////////////

    newPost({commit, dispatch},data){

        commit("setLoadingStatus",'loading')
        
        axios.post('http://localhost:3000/api/post',data,{
            headers: {
                 "authorization" : 'Bearer ' + localStorage.getItem('token'),
                 },
        }) 
        .then(function(response) {
            console.log(response.data);
            
            dispatch('getPost','all');
            commit('setLoadingStatus','notLoading');

        })
        .catch(function (error) {
            console.log(error);
        });
    },
//////////////////////////////////////////////////////////////////
    updatePost({commit, dispatch},data){
        console.log(data);
        commit("setLoadingStatus",'loading')

        axios.put('http://localhost:3000/api/post/'+data.id,data.form,{
            headers: {
                 "authorization" : 'Bearer ' + localStorage.getItem('token'),
                 },
        }) 
        .then(function(response) {
            console.log(response.data);
            
            dispatch('getPost',data.query);
            commit('setLoadingStatus','notLoading');

        })
        .catch(function (error) {
            console.log(error);
        });
        
    },
///////////////////////////////////////////////////////////////////
    deletePost({commit, dispatch},data){
        console.log(data);
        commit("setLoadingStatus",'loading')

        fetch('http://localhost:3000/api/post/'+ data.id, {
            method : "DELETE",
            headers: {
                "Content-Type": "application/json" ,
                "authorization" : 'Bearer ' + localStorage.getItem('token'),
                },
        }) 
        .then(function(res){return res.json();}) 
        .then(value => (console.log(value),         
            dispatch('getPost', data.query),
            commit('setLoadingStatus','notLoading')
        
        ))
        .catch(function(){
            console.log('erreur de requete');
        })
        
    },
///////////////////////////////////////////////////////////////////    
// [COMS]
///////////////////////////////////////////////////////////////////    

    getComs({commit}){

            axios.get('http://localhost:3000/api/com/all',{
                headers: {
                    "authorization" : 'Bearer ' + localStorage.getItem('token'),
                    },
            }) 
            .then(function(response) {
                // console.log('data get all coms');
                // console.log(response.data);
                commit('setComs',response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
///////////////////////////////////////////////////////////////////

    newCom({dispatch},data){
        console.log(data);
        // commit("setLoadingStatus",'loading')

        axios.post('http://localhost:3000/api/com/',data.form,{
            headers: {
                "authorization" : 'Bearer ' + localStorage.getItem('token'),
                },
        }) 
        .then(function(response) {
            console.log(response.data);
            
            // dispatch('getPost',data.query);
            dispatch('getComs');

            // commit('setLoadingStatus','notLoading');

        })
        .catch(function (error) {
            console.log(error);
        });
    },
///////////////////////////////////////////////////////////////////
    deleteCom({dispatch},data){
        console.log(data);
        // commit("setLoadingStatus",'loading')

        axios.delete('http://localhost:3000/api/com/'+data.id,{
            headers: {
                "authorization" : 'Bearer ' + localStorage.getItem('token'),
                },
        }) 
        .then(function(response) {
            console.log(response.data);
            
            // dispatch('getPost',data.query);
            dispatch('getComs');

            // commit('setLoadingStatus','notLoading');

        })
        .catch(function (error) {
            console.log(error);
        });
    },
///////////////////////////////////////////////////////////////////
    updateCom({dispatch},data){
        console.log(data);
        // commit("setLoadingStatus",'loading')


        axios.put('http://localhost:3000/api/com/'+data.id,data.data,{
            headers: {
                "authorization" : 'Bearer ' + localStorage.getItem('token'),
                },
        }) 
        .then(function(response) {
            console.log(response.data);
            
            // dispatch('getPost',data.query);
            dispatch('getComs');
            // commit('setLoadingStatus','notLoading');

        })
        .catch(function (error) {
            console.log(error);
        });
    },
///////////////////////////////////////////////////////////////////
addLike(_,data){
    console.log('add like')
    console.log(data)

    axios.post('http://localhost:3000/api/like/post',data,{
              headers: {
                  "Content-Type": "application/json" ,
                  "authorization" : 'Bearer ' + localStorage.getItem('token'),
                  },
          }) 
          .then(function(response) {
            console.log(response.data);
          })
          .catch(function (error) {
              console.log(error);
          });
    },
  ///////////////////////////////////////////////////////////////////
  unLike(_,data){
    console.log('un like')
    console.log(data)

    axios.delete('http://localhost:3000/api/like/'+data.id+'/'+data.form,{
              headers: {
                  "Content-Type": "application/json" ,
                  "authorization" : 'Bearer ' + localStorage.getItem('token'),
                  },
          }) 
          .then(function(response) {
            console.log(response.data);
          })
          .catch(function (error) {
              console.log(error);
          });
  }
  


},


strict :false

}
export const strict =false;

