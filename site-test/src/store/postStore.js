// import router from "../router/index.js"
import axios from 'axios'
// import store from '.';

export const postStore ={
  
  namespaced: true,

  state: {
    name: "postStore",

    post: null,
    com: null,

  },
  getters:{
    //   getPosts(state){
    //       return state.post
    //   }
    // getComs(state){
    //       return state.com
    //   }
  },
  mutations: {
    setPost(state,data){
        state.post = data;
    },
    setCom(state,value){
        state.com = value;
    }
  },

  actions: {

    // quad ça fonctionnera, rappeler get post apres une action de modification/enchainer avec une autre action
    getPost({commit ,state},query){
          console.log('get post :'+ query);

        axios.get('http://localhost:3000/api/post/'+query, {
            headers: { 
                "Content-Type": "application/json",
                "authorization" : 'Bearer ' + localStorage.getItem('token'), 
            },
        }) 
        .then(res => {
            // this.data = response.data
            const dataPost = res.data;
            commit("setPost",dataPost),

            console.log('getData');
            console.log(state.post);

        })
        .catch(function(){
            console.log('erreur de requete');
        })
      },//get post
      ///////////////////////////////////////////////////////////////////
    //   getCom({commit,state},postId) {
          
    //     fetch('http://localhost:3000/api/com/post/'+postId, {
    //         method : "Get",
    //         headers: { 
    //             "Content-Type": "application/json",
    //             "authorization" : 'Bearer ' + localStorage.getItem('token'), 
    //         },
    //     }) 
    //     .then(res => res.json())
    //     .then(value => {
    //         const dataCom = value;
    //         commit("setCom",dataCom),

    //         console.log('getcom');
    //         console.log(state.com);

    //     })
    //     .catch(function(){
    //         console.log('erreur de requete');
    //     });
    //   }
  },

strict :false

}
export const strict =false;
