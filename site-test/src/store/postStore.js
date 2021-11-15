// import router from "../router/index.js"
import axios from 'axios'
// import store from '.';

export const postStore ={
  
  namespaced: true,

     state: {
    name: "postStore",

    posts: null,
    com: null,
  },
  getters:{
    getPosts(state){
        return state.posts
    },
   
   
},
  mutations: {
    setPost(state,data){
        state.posts = data;
    },
    setCom(state,value){
        state.com = value;
    },
    showData(value){
        console.log(value);
    }
  },
  actions: {

    // quad ça fonctionnera, rappeler get post apres une action de modification/enchainer avec une autre action
    async getPost({commit},query){
          console.log('get post :'+ query);

    await axios.get('http://localhost:3000/api/post/'+query, {
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
      },//get post

///////////////////////////////////////////////////////////////////
    async  getCom({commit}) {
          
    await  fetch('http://localhost:3000/api/com/all', {
            method : "Get",
            headers: { 
                "Content-Type": "application/json",
                "authorization" : 'Bearer ' + localStorage.getItem('token'), 
            },
        }) 
        .then(res => res.json())
        .then(value => {
            const dataCom = value;
            commit("setCom",dataCom)

            // console.log('getcom');
            // console.log(state.com);

        })
        .catch(function(){
            console.log('erreur de requete');
        });
      },
///////////////////////////////////////////////////////////////////

},

strict :false

}
export const strict =false;

