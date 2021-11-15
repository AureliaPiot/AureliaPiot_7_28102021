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

    showData(value){
        console.log(value);
    }
  },
  actions: {

    // si il n'y a pas de commit ou autre, utilser _
// le seul qui fonctionne

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
// {commit, dispatch},
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
    }

},

strict :false

}
export const strict =false;

