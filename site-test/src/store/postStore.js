// import router from "../router/index.js"
import axios from 'axios'
// import store from '.';

export const postStore ={
  
  namespaced: true,

  state: {
    name: "postStore",

    loadingStatus:'not Loading',

    posts: null,


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
    setCom(state,data){
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
            dispatch('getPost', data.query),
            commit('setLoadingStatus','notLoading')
        
        ))
        .catch(function(){
            console.log('erreur de requete');
        })
        
    },
///////////////////////////////////////////////////////////////////

    newCom({commit, dispatch},data){
    console.log(data);
    commit("setLoadingStatus",'loading')


        axios.post('http://localhost:3000/api/com/',data.form,{
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


},


strict :false

}
export const strict =false;

