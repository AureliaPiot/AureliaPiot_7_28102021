import router from "../router/index.js"

export const userStore ={
  
  namespaced: true,

  state: {
    // User data
    name: "userStore",
    //status: tant qu'un token est trouver, le statut sera 'true', sinon 'false'
    status:'',
    // les recupe depuis le local storage
    //pour ne pas appeler le localStorage sur toute les pages
    user:{
      userId:'',
      userRole:'',
      token:'',
    },
  },
  // getters = {
  //   loggedIn: (state) => {
  //     return state.user.token ? true : false
  // },
  
  mutations: {


    logUser(state,userState){
      state.user = userState;
      console.log("logUser");
      console.log(userState);
      console.log(state.user.userRole.length);
      console.log(state.user.userId);

    },
    setStatus(state,status){
      state.status =status;
      // (state, status) state = state du store ; status = le parametre envoyé lors de l'appele de la mutation
      // state.status = on defini le status de notre state (dans le store) avec le parametre status
    },
  },


  actions: {
    Sign: ({dispatch}, userSign)=>{

      // {commit} si on veut effectuer une mutation
      // {dispatch} si on veut effectuer une action 
      // 'userSign' est la denomination de l'objet recus
      // puis on ecrits l'action que l'on veux executé
      console.log('Sign');
      console.log(userSign);
      
            fetch('http://localhost:3000/api/user/sign', {
                method : "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userSign),
            }) 
            .then(function(res){
                    return res.json();
            })    
            .then(function(value){
                  console.log(value.message);

                   console.log('userSign');
                  console.log(userSign.email);

                  // this.login({
                  //   email : userSign.email,
                  //   password : userSign.password
                  // })
                dispatch('login', {email : userSign.email, password : userSign.password})                  
            })
            .catch(function(){
                console.log('erreur de creation de compte');
            })
    },//Sign


    login: ({commit}, userLogin)=>{
      // const self = this;
      commit('setStatus','loading');
      // ici commit permet de transmetre des donnée a l'exterieur de la methode/fonction
      // commit pour envoyer des info a "setStatus"(une fonction), la valeur "loading"
      console.log('sign');
      // console.log(userLogin);

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
              console.log(value);

              commit("logUser",value)

              localStorage.setItem("token",value.token);
              localStorage.setItem("userId",value.userId);
              localStorage.setItem("role",value.userRole);

              router.push("home");

              // self.$router.go('/home');
              console.log("connexion autoriser");
              return
          }
          console.log("connexion non autoriser");

      })
      .catch(function(){
          console.log('erreur de connexion');
      })


    },//Login
    logOut({commit}){
      localStorage.clear();
      commit("logUser",{
        userId:'',
        userRole:'',
        token:'',
      })
      router.push({name:"Sign"});


    },
    // addLike({commit}){

    // }
  },
  modules: {
  },
  
//   plugins: [
//     createPersistedState({
//       paths: ['user'],
//     }),
//   ],
}


// apres avoir indiquer un 'name' dans le state,
// on peux acceder a ses données dans un composant via:
//  data(){
//   return{
//     data: this.$store.state.name
// } }