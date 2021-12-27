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
        state.coms = data;

    }

  },

  actions: {

    getPost({commit},query){
          console.log('get post : '+ query);
          commit("setLoadingStatus",'loading')

        axios.get('http://localhost:3000/api/post/'+query, {
            headers: { 
                "Content-Type": "application/json",
                "authorization" : 'Bearer ' + localStorage.getItem('token'), 
            },
        }) 
        .then(res => {
            commit("setPost",res.data)
        })
        .catch(function(){
            console.log('erreur de requete');
        })
        commit("setLoadingStatus",'notloading')
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
            
        })
        .catch(function (error) {
            console.log(error);
        });
        commit('setLoadingStatus','notLoading');
    },
//////////////////////////////////////////////////////////////////
    updatePost({commit, dispatch},data){
        commit("setLoadingStatus",'loading')

        axios.put('http://localhost:3000/api/post/'+data.id,data.form,{
            headers: {
                 "authorization" : 'Bearer ' + localStorage.getItem('token'),
                 },
        }) 
        .then(function(response) {
            console.log(response.data);
            
            dispatch('getPost',data.query);
            
        })
        .catch(function (error) {
            console.log(error);
        });
        commit('setLoadingStatus','notLoading');
        
    },
///////////////////////////////////////////////////////////////////
    deletePost({commit, dispatch},data){
        // console.log(data);
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
            dispatch('getPost', data.query)
            ))
        .catch(function(){
            console.log('erreur de requete');
        })
        commit('setLoadingStatus','notLoading')
        
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
                commit('setComs',response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
///////////////////////////////////////////////////////////////////

    newCom({dispatch},data){


        axios.post('http://localhost:3000/api/com/',data.form,{
            headers: {
                "authorization" : 'Bearer ' + localStorage.getItem('token'),
                },
        }) 
        .then(function(response) {
            console.log(response.data.message);

            dispatch('getComs');

        })
        .catch(function (error) {
            console.log(error);
        });
    },
///////////////////////////////////////////////////////////////////
    deleteCom({dispatch},data){

        axios.delete('http://localhost:3000/api/com/'+data.id,{
            headers: {
                "authorization" : 'Bearer ' + localStorage.getItem('token'),
                },
        }) 
        .then(function(response) {
            console.log(response.data);           
            dispatch('getComs');

        })
        .catch(function (error) {
            console.log(error);
        });
    },
///////////////////////////////////////////////////////////////////
    updateCom({dispatch},data){
        console.log(data);



        axios.put('http://localhost:3000/api/com/'+data.id,data.data,{
            headers: {
                "authorization" : 'Bearer ' + localStorage.getItem('token'),
                },
        }) 
        .then(function(response) {
            console.log(response.data);
            
            dispatch('getComs');

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

