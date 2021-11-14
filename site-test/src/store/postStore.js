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
        return state.post
    },
    async getComsByPostId({state},payload){
        return state.com.filer(com=>com.PostId === payload)
    }
},

  mutations: {
    setPost(state,data){
        state.post = data;
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
    async getPost({commit ,state},query){
          console.log('get post :'+ query);

    await axios.get('http://localhost:3000/api/post/'+query, {
            headers: { 
                "Content-Type": "application/json",
                "authorization" : 'Bearer ' + localStorage.getItem('token'), 
            },
        }) 
        .then(res => {
            commit("setPost",res.data),

            console.log('getData');
            console.log(state.post);

        })
        .catch(function(){
            console.log('erreur de requete');
        })
      },//get post



///////////////////////////////////////////////////////////////////
    async  getCom({commit,state}) {
          
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
            commit("setCom",dataCom),

            console.log('getcom');
            console.log(state.com);

        })
        .catch(function(){
            console.log('erreur de requete');
        });
      },
///////////////////////////////////////////////////////////////////



    savePost({commit},id,content,oldfile,file){
        console.log(id)
        console.log(content)
        console.log(oldfile)
        console.log(file)

        commit("showData",id)

///////////////////////////////////////////////////////////////////


        // fetch('http://localhost:3000/api/post/'+postId, {
        //     method : "Put",
        //     headers: { 
        //         // "Content-Type": "application/json", 
        //         "authorization" : 'Bearer ' + localStorage.getItem('token'),
        //         },
        //     body: form,
        // }) 
        // .then(function(res){return res.json();}) 
        // .then(value => (
        //     // dispatch('postStore/getPost',query),
        //     console.log(value) 
        //     ))
        // .catch(function(){
        //     console.log('erreur de requete');
        // })
  },






},

strict :false

}
export const strict =false;

