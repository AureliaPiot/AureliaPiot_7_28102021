// import router from "../router/index.js"
import axios from 'axios'
// import store from '.';

export const postStore ={
  
  namespaced: true,

  state: {
    name: "postStore",

    post: null,

  },
  getters:{
      allPosts : state => state.post
    //   getPosts(state){
    //       return state.post
    //   }
  },


  actions: {
    // ne fonctionne pas au rechargement de la page
    // quad ça fonctionnera, rappeler get post apres une action de modification/enchainer avec une autre action
     async getPost({commit},query){
          console.log(query)

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
            console.log(postStore.state.post);
        })
        .catch(function(){
            console.log('erreur de requete');
        })
      }//get post
  },

  mutations: {

    setPost(state,data){
        state.post = data;
    }
  },

}
