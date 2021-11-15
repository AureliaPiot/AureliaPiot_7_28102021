// import router from "../router/index.js"
import axios from 'axios'
// import store from '.';

export const postStore ={
  
  namespaced: true,

  state: {
    name: "postStore",

    posts: null,

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

    showData(value){
        console.log(value);
    }
  },
  actions: {

// le seul qui fonctionne

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

},

strict :false

}
export const strict =false;

